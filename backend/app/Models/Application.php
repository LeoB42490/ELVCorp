<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    /** @use HasFactory<\Database\Factories\ApplicationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'docker_image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function offers() 
    {
        return $this->belongsToMany(
            Offers::class, 
            'application_offers',
            'application_id',
            'offer_id'
        );
    }
}
