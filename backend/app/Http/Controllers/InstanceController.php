<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instance;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\InstanceDeletedMail;
use Throwable;

class InstanceController extends Controller
{
    public function index(Request $request)
    {
        return Instance::where('user_id', $request->user()->id)
            ->with('applicationOffer')
            ->get();
    }

    public function destroy($id) 
    {
        $instance = Instance::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        

        $instance->update([
            'status' => 'deleting',
        ]);
        // Ici plus tard : supprimer aussi le conteneur Proxmox avec $instance->proxmox_ctid
        // Exemple : appel API Proxmox ou script de suppression


        Mail::to($instance->user->email)
            ->send(new InstanceDeletedMail($instance));

        $instance->delete();

        return response()->json([
            'message' => 'Instance supprimée avec succès',
            'instance' => $instance
        ]);
    }
}
