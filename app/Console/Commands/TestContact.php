<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\EnquiryController;
use Illuminate\Http\Request;

class TestContact extends Command
{
    protected $signature = 'test:contact';
    protected $description = 'Test contact form submission';

    public function handle()
    {
        $controller = new EnquiryController();
        $request = Request::create('/contact', 'POST', [
            'name' => 'John',
            'lastName' => 'Doe',
            'email' => 'john@test.com',
            'phone' => '1234567890',
            'course_id' => 1,
            'message' => 'Test message'
        ]);
        
        // Mock validation by extending request or we just use app
        app()->instance('request', $request);
        
        try {
            $response = $controller->storeContact($request);
            $this->info("Response status: " . $response->getStatusCode());
            if ($response->getStatusCode() == 302) {
                $this->info("Session errors:");
                $this->info(json_encode(session()->get('errors')));
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            $this->error("Validation failed:");
            $this->error(json_encode($e->errors()));
        } catch (\Exception $e) {
            $this->error("Exception: " . $e->getMessage());
        }
    }
}
