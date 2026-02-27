<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'budget_id',
        'start_date',
        'end_date',
        'status',
        'progress',
        'remarks',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function budget()
    {
        return $this->belongsTo(Budget::class);
    }
}
