<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ApplicationOffer;
use App\Models\Instance;
use App\Services\PayPalService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function create(Request $request, PayPalService $paypal)
    {
        $request->validate([
            'application_id' => 'required|exists:applications,id',
            'offer_id' => 'required|exists:offers,id',
        ]);

        $applicationOffer = ApplicationOffer::with('offer')
            ->where('application_id', $request->application_id)
            ->where('offer_id', $request->offer_id)
            ->firstOrFail();

        $amount = $applicationOffer->offer->price;

        $order = Order::create([
            'user_id' => $request->user()->id,
            'application_offer_id' => $applicationOffer->id,
            'amount' => $amount,
            'status' => 'pending',
        ]);

        $paypalOrder = $paypal->createOrder($amount);

        $order->update([
            'paypal_order_id' => $paypalOrder['id'],
        ]);

        return response()->json([
            'order_id' => $order->id,
            'paypal_order_id' => $paypalOrder['id'],
        ]);
    }

    public function capture(Request $request, Order $order, PayPalService $paypal)
    {
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Commande déjà traitée.',
            ], 400);
        }

        $capture = $paypal->captureOrder($order->paypal_order_id);

        if (($capture['status'] ?? null) === 'COMPLETED') {
            $captureId = $capture['purchase_units'][0]['payments']['captures'][0]['id'] ?? null;

            $order->update([
                'status' => 'paid',
                'paypal_capture_id' => $captureId,
            ]);

            // Ici ensuite tu lanceras la création de l’instance Proxmox
            // Exemple futur :
            // app(InstanceService::class)->deploy($order);

            $instance = Instance::create([
                'user_id' => $order->user_id,
                'application_offer_id' => $order->application_offer_id,
                'name' => 'instance-' . $order->id,
                'status' => 'provisioning',
            ]);

            app(\App\Services\ProxmoxDeployService::class)->deployMinecraft($instance);

            return response()->json([
                'message' => 'Paiement validé',
                'order' => $order,
            ]);
        }

        $order->update([
            'status' => 'failed',
        ]);

        return response()->json([
            'message' => 'Paiement refusé ou non terminé',
            'paypal_response' => $capture,
        ], 400);
    }
}
