<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offers extends Model
{
    /** @use HasFactory<\Database\Factories\OffersFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'cpu',
        'ram_mb',
        'storage_gb',
        'price',
        'is_active',
    ];

    public function applications()
    {
        return $this->belongsToMany(
            Application::class, 
            'application_offers',
            'offer_id',
            'application_id',    
        );
    }

    public function applicationOffers()
    {
        return $this->hasMany(ApplicationOffer::class, 'offer_id');
    }
}
