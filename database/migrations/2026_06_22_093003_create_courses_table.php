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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('programs')->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('short_desc')->nullable();
            $table->longText('description')->nullable();
            $table->string('thumbnail')->nullable();
            
            // JSON Fields for dynamic flexible data
            $table->json('stats')->nullable(); // Array of {number: '2 Yrs', label: 'Program Duration'}
            $table->json('competencies')->nullable(); // Array of {icon: 'ri-...', title: '...', desc: '...', bg: '...'}
            $table->json('advantages')->nullable(); // Array of {title: '...', desc: '...', icon: '...'}
            $table->json('eligibility')->nullable(); // Array of strings for bullet points
            $table->json('entrance_test')->nullable(); // Array of strings for bullet points
            $table->json('placements')->nullable(); // Array of strings for bullet points
            
            $table->string('brochure_file')->nullable();
            $table->string('university_name')->nullable();
            $table->string('university_logo')->nullable();
            
            $table->string('duration')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
