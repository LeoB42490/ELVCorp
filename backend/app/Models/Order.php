<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'application_offer_id',
        'amount',
        'status',
        'paypal_order_id',
        'paypal_capture_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applicationOffer()
    {
        return $this->belongsTo(applicationOffer::class);
    }
}
