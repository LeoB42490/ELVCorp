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

    public function offer()
    {
        return $this->belongsTo(Offer::class, 'offer_id');
    }

    public function application()
    {
        return $this->belongsTo(Application::class, 'application_id');
    }
}
