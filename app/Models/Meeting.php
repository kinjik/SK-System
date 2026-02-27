<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    protected $fillable = [
        'type',
        'date',
        'called_to_order',
        'adjourned_at',
        'venue',
        'agenda',
        'minutes',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function resolutions()
    {
        return $this->hasMany(Resolution::class);
    }
}
