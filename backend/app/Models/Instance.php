<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instance extends Model
{
    protected $fillable = [
        'user_id',
        'application_offer_id',
        'name',
        'status',
        'ip_address',
        'port',
        'proxmox_ctid',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function applicationOffer()
    {
        return $this->belongsTo(ApplicationOffer::class);
    }
}
