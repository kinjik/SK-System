<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    protected $fillable = [
        'fiscal_year',
        'category',
        'description',
        'amount',
        'spent',
        'status',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
