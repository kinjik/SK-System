<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'type',
        'title',
        'content',
        'generated_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
