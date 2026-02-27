<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resolution extends Model
{
    protected $fillable = [
        'meeting_id',
        'resolution_number',
        'title',
        'body',
        'status',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }
}
