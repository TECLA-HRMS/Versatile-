<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;
use App\Models\Course;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the parent MBA program
        $mba = Program::firstOrCreate(
            ['slug' => 'mba'],
            [
                'name' => 'Master of Business Administration',
                'short_desc' => 'Department of Management',
                'description' => 'A comprehensive 2-year postgraduate program focused on advanced business strategies and management principles.',
                'level' => 'Postgraduate',
                'format' => 'Full-Time',
                'duration' => '2 Years',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        // 1. Digital Marketing Course
        Course::firstOrCreate(
            ['slug' => 'digital-marketing'],
            [
                'program_id' => $mba->id,
                'name' => 'MBA Digital Marketing',
                'short_desc' => 'Department of Management',
                'description' => 'Master the digital landscape — from SEO to social media strategy. Earn while you learn with guaranteed placements. In the digital age, businesses thrive on their online presence. Versatile Business School offers a unique 2-year MBA in Digital Marketing that equips you with strategic frameworks and technical skills needed to dominate search engines, optimize ad spend, and build massive online communities.',
                'thumbnail' => 'assets/images/program/program-thumb-06.webp',
                'banner_image' => 'assets/images/bg/inner-bg.jpg',
                'duration' => '2 Years',
                'stats' => [
                    ['number' => '2 Yrs', 'label' => 'Program Duration'],
                    ['number' => 'A+', 'label' => 'University Grade'],
                    ['number' => '100%', 'label' => 'Placement Support'],
                    ['number' => '₹10K+', 'label' => 'Earn While Learning']
                ],
                'competencies' => [
                    ['icon' => 'ri-search-eye-line', 'title' => 'SEO & SEM', 'desc' => 'Dominate search rankings and drive high-intent traffic.', 'bg' => '#fef9e7'],
                    ['icon' => 'ri-share-line', 'title' => 'Social & Brand Strategy', 'desc' => 'Build engaged communities and viral marketing campaigns.', 'bg' => '#eef2ff'],
                    ['icon' => 'ri-pie-chart-box-line', 'title' => 'Marketing Analytics', 'desc' => 'Measure ROI and make data-driven performance decisions.', 'bg' => '#ecfdf5']
                ],
                'advantages' => [
                    ['title' => 'Guaranteed Digital Roles', 'desc' => 'Employment during study as Digital Marketer, SEO Specialist, or Ads Manager.', 'icon' => 'ri-briefcase-4-line'],
                    ['title' => 'Salary ₹10K - ₹15K', 'desc' => 'Monthly salary based on ability and performance of the candidate.', 'icon' => 'ri-money-rupee-circle-line'],
                    ['title' => '75-100% Fee Recovery', 'desc' => 'Recover course fee through employment salary in the first 2 years.', 'icon' => 'ri-wallet-3-line'],
                    ['title' => '2 Years Experience', 'desc' => 'Gain agency or in-house digital marketing experience alongside your MBA.', 'icon' => 'ri-award-line']
                ],
                'eligibility' => [
                    'Any UG degree with minimum 50% marks',
                    'Final year students can apply',
                    'Satisfactory score in VBS Entrance Test'
                ],
                'entrance_test' => [
                    'General English: Speaking & Writing (25)',
                    'General Awareness: Objective (25)'
                ],
                'placements' => [
                    'Instant, part-time, and full-time placements provided',
                    'Training in confident communication for corporate challenges',
                    'On-the-job training in Marketing, HR, and Analytics'
                ],
                'university_name' => 'Alagappa University',
                'university_logo' => 'https://versatilebschool.com/wp-content/uploads/2023/02/Alagappa_University_Logo.png',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        // 2. Business Analytics Course
        Course::firstOrCreate(
            ['slug' => 'business-analytics'],
            [
                'program_id' => $mba->id,
                'name' => 'MBA Business Analytics',
                'short_desc' => 'Department of Management',
                'description' => 'Develop analytical, data-driven decision-making skills using modern business intelligence, data visualization, and predictive analytics tools.',
                'thumbnail' => 'assets/images/program/program-thumb-04.webp',
                'banner_image' => 'assets/images/bg/inner-bg.jpg',
                'duration' => '2 Years',
                'stats' => [
                    ['number' => '2 Yrs', 'label' => 'Program Duration'],
                    ['number' => 'A+', 'label' => 'University Grade'],
                    ['number' => '100%', 'label' => 'Placement Support'],
                    ['number' => 'Data', 'label' => 'Driven Future']
                ],
                'competencies' => [
                    ['icon' => 'ri-bar-chart-box-line', 'title' => 'Data Visualization', 'desc' => 'Transform complex data into actionable visual insights.', 'bg' => '#fef9e7'],
                    ['icon' => 'ri-line-chart-line', 'title' => 'Predictive Analytics', 'desc' => 'Forecast trends and build resilient business models.', 'bg' => '#eef2ff'],
                    ['icon' => 'ri-database-2-line', 'title' => 'Big Data Management', 'desc' => 'Handle and extract value from large-scale datasets.', 'bg' => '#ecfdf5']
                ],
                'advantages' => [
                    ['title' => 'High Demand Skills', 'desc' => 'Master tools like Python, R, Tableau, and PowerBI.', 'icon' => 'ri-macbook-line'],
                    ['title' => 'Corporate Readiness', 'desc' => 'Work on real datasets and solve actual business problems.', 'icon' => 'ri-building-line'],
                    ['title' => 'Strategic Thinking', 'desc' => 'Bridge the gap between IT and business strategy.', 'icon' => 'ri-mind-map']
                ],
                'eligibility' => [
                    'Any UG degree with minimum 50% marks',
                    'Final year students can apply',
                    'Satisfactory score in VBS Entrance Test'
                ],
                'entrance_test' => [
                    'General English: Speaking & Writing (25)',
                    'General Awareness & Logic: Objective (25)'
                ],
                'placements' => [
                    'Instant, part-time, and full-time placements provided',
                    'Training in confident communication for corporate challenges',
                    'On-the-job training in Analytics and Business Intelligence'
                ],
                'university_name' => 'Alagappa University',
                'university_logo' => 'https://versatilebschool.com/wp-content/uploads/2023/02/Alagappa_University_Logo.png',
                'is_active' => true,
                'sort_order' => 2,
            ]
        );

        // 3. Industry Integrated Course
        Course::firstOrCreate(
            ['slug' => 'industry-integrated'],
            [
                'program_id' => $mba->id,
                'name' => 'MBA Industry Integrated',
                'short_desc' => 'Department of Management',
                'description' => 'A career-focused MBA program that combines academic learning with real-world industry exposure, internships, and practical business applications.',
                'thumbnail' => 'assets/images/program/program-thumb-05.webp',
                'banner_image' => 'assets/images/bg/inner-bg.jpg',
                'duration' => '2 Years',
                'stats' => [
                    ['number' => '2 Yrs', 'label' => 'Program Duration'],
                    ['number' => 'A+', 'label' => 'University Grade'],
                    ['number' => '100%', 'label' => 'Placement Support'],
                    ['number' => 'OJT', 'label' => 'On-Job Training']
                ],
                'competencies' => [
                    ['icon' => 'ri-group-line', 'title' => 'Leadership', 'desc' => 'Manage teams and lead organizational change.', 'bg' => '#fef9e7'],
                    ['icon' => 'ri-settings-4-line', 'title' => 'Operations Management', 'desc' => 'Optimize supply chains and business processes.', 'bg' => '#eef2ff'],
                    ['icon' => 'ri-briefcase-4-line', 'title' => 'Corporate Strategy', 'desc' => 'Develop and execute competitive business strategies.', 'bg' => '#ecfdf5']
                ],
                'advantages' => [
                    ['title' => 'Industry Exposure', 'desc' => 'Frequent industrial visits and guest lectures from CEOs.', 'icon' => 'ri-building-4-line'],
                    ['title' => 'Paid Internships', 'desc' => 'Mandatory 6-month internship in top MNCs.', 'icon' => 'ri-money-dollar-circle-line'],
                    ['title' => 'Holistic Development', 'desc' => 'Focus on soft skills, communication, and personality.', 'icon' => 'ri-user-star-line']
                ],
                'eligibility' => [
                    'Any UG degree with minimum 50% marks',
                    'Final year students can apply',
                    'Satisfactory score in VBS Entrance Test'
                ],
                'entrance_test' => [
                    'General English: Speaking & Writing (25)',
                    'General Awareness: Objective (25)'
                ],
                'placements' => [
                    'Instant, part-time, and full-time placements provided',
                    'Training in confident communication for corporate challenges',
                    'On-the-job training across various management domains'
                ],
                'university_name' => 'Alagappa University',
                'university_logo' => 'https://versatilebschool.com/wp-content/uploads/2023/02/Alagappa_University_Logo.png',
                'is_active' => true,
                'sort_order' => 3,
            ]
        );

        // Create the parent PGDM program
        $pgdm = Program::firstOrCreate(
            ['slug' => 'pgdm'],
            [
                'name' => 'Post Graduate Diploma in Management',
                'short_desc' => 'Department of Management',
                'description' => 'A rigorous, industry-oriented postgraduate diploma program designed to build strong management fundamentals.',
                'level' => 'Postgraduate',
                'format' => 'Full-Time',
                'duration' => '1 Year',
                'is_active' => true,
                'sort_order' => 2,
            ]
        );

        // 1-year PGDM - Dual Specializations Course
        Course::firstOrCreate(
            ['slug' => '1-year-pgdm-dual-specializations'],
            [
                'program_id' => $pgdm->id,
                'name' => '1-year PGDM - Dual Specializations',
                'short_desc' => 'Department of Management',
                'description' => 'An intensive 1-year Post Graduate Diploma in Management offering Dual Specializations in: Marketing Management, Financial Management, Human Resource Management, Operations Management, System & IT, and Digital Marketing.',
                'thumbnail' => 'assets/images/program/program-thumb-01.webp',
                'banner_image' => 'assets/images/bg/inner-bg.jpg',
                'duration' => '1 Year',
                'stats' => [
                    ['number' => '1 Yr', 'label' => 'Program Duration'],
                    ['number' => 'Dual', 'label' => 'Specializations'],
                    ['number' => '100%', 'label' => 'Placement Support'],
                    ['number' => 'OJT', 'label' => 'On-Job Training']
                ],
                'competencies' => [
                    ['icon' => 'ri-briefcase-4-line', 'title' => 'Specialized Knowledge', 'desc' => 'Gain deep expertise in two core management domains.', 'bg' => '#fef9e7'],
                    ['icon' => 'ri-bar-chart-box-line', 'title' => 'Business Acumen', 'desc' => 'Develop strong decision-making and strategic skills.', 'bg' => '#eef2ff'],
                    ['icon' => 'ri-group-line', 'title' => 'Leadership', 'desc' => 'Build the capability to lead cross-functional teams.', 'bg' => '#ecfdf5']
                ],
                'advantages' => [
                    ['title' => 'Dual Specializations', 'desc' => 'Choose any two from Marketing, Finance, HR, Operations, IT, and Digital Marketing.', 'icon' => 'ri-medal-line'],
                    ['title' => 'Fast-Track Career', 'desc' => 'Complete your management education in just 1 year.', 'icon' => 'ri-rocket-line'],
                    ['title' => 'Industry Ready', 'desc' => 'Curriculum aligned with current industry requirements.', 'icon' => 'ri-building-4-line']
                ],
                'eligibility' => [
                    'Any UG degree with minimum 50% marks',
                    'Final year students can apply',
                    'Satisfactory score in VBS Entrance Test'
                ],
                'entrance_test' => [
                    'General English: Speaking & Writing (25)',
                    'General Awareness: Objective (25)'
                ],
                'placements' => [
                    'Instant, part-time, and full-time placements provided',
                    'Training in confident communication for corporate challenges',
                    'On-the-job training in selected specialization areas'
                ],
                'university_name' => 'Alagappa University',
                'university_logo' => 'https://versatilebschool.com/wp-content/uploads/2023/02/Alagappa_University_Logo.png',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );
    }
}
