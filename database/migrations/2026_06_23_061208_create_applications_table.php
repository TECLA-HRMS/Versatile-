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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->date('dob')->nullable();
            $table->string('gender')->nullable();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->string('undergrad_degree')->nullable();
            $table->string('undergrad_university')->nullable();
            $table->string('undergrad_cgpa')->nullable();
            $table->decimal('work_experience', 4, 1)->nullable();
            $table->string('document_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
