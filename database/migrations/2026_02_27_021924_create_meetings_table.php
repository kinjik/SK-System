<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meetings', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['regular', 'special', 'emergency'])->default('regular');
            $table->date('date');
            $table->time('called_to_order');
            $table->time('adjourned_at')->nullable();
            $table->string('venue');
            $table->text('agenda');
            $table->text('minutes')->nullable();
            $table->enum('status', ['scheduled', 'ongoing', 'adjourned'])->default('scheduled');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meetings');
    }
};
