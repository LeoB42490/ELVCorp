<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;

class ApplicationOfferController extends Controller
{
    public function getOffersByApplication($id)
    {
        //dd($id);
        $application = Application::where('id', $id)
            ->where('is_active', 1)
            ->first();
        
        if (!$application) {
            return response()->json(['message' => 'Application introuvable'], 404);
        }

        $offers = $application->offers()
            ->where('offers.is_active', 1)
            ->orderBy('price', 'asc')
            ->get();
        
        return response()->json([
            'application' => $application,
            'offers' => $offers
        ]);
    }
}
