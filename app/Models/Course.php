<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Course extends Model
{
    use HasFactory, LogsActivity;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    protected $fillable = [
        'program_id',
        'name',
        'slug',
        'short_desc',
        'description',
        'thumbnail',
        'banner_image',
        'stats',
        'competencies',
        'advantages',
        'eligibility',
        'entrance_test',
        'placements',
        'brochure_file',
        'university_name',
        'university_logo',
        'duration',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'stats' => 'array',
        'competencies' => 'array',
        'advantages' => 'array',
        'eligibility' => 'array',
        'entrance_test' => 'array',
        'placements' => 'array',
        'is_active' => 'boolean',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($course) {
            if (empty($course->slug)) {
                $course->slug = Str::slug($course->name);
            }
        });

        static::updating(function ($course) {
            if (empty($course->slug)) {
                $course->slug = Str::slug($course->name);
            }
        });
    }
}
