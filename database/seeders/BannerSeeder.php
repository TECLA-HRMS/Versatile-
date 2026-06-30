<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Banner;
use Faker\Factory as Faker;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 20; $i++) {
            // Using a generic placeholder image URL
            $imageNum = rand(1, 10);
            $imagePath = 'assets/images/bg/banner-bg-thumb-0' . ($imageNum == 10 ? '9' : $imageNum) . '.webp';

            Banner::create([
                'image' => $imagePath,
                'title' => $faker->catchPhrase(),
                'subtitle' => $faker->company(),
                'button_text' => 'Learn More',
                'button_link' => 'apply-now',
                'order' => $i,
                'is_active' => $faker->boolean(80), // 80% chance of being active
            ]);
        }
    }
}
