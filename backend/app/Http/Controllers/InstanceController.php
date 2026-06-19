<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instance;

class InstanceController extends Controller
{
    public function index(Request $request)
    {
        return Instance::where('user_id', $request->user()->id)
            ->with('applicationOffer')
            ->get();
    }
}
