<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApplicationOffer extends Model
{
    /** @use HasFactory<\Database\Factories\ApplicationOfferFactory> */
    use HasFactory;

    protected $fillable = [
        'application_id',
        'offer_id',
    ];
}
