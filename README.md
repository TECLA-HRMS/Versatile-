# Versatile Business School

A modern, dynamic, and fully responsive web application built for **Versatile Business School**. This platform serves as the digital front door for the institution, providing prospective students with information about programs, courses, placements, and campus life, while simultaneously offering a robust backend for administrators to manage content, applications, and inquiries.

## 🚀 Technology Stack

This project is built using a modern, high-performance web development stack:

- **Backend Framework:** Laravel (PHP)
- **Frontend Framework:** React.js
- **State/Routing Bridge:** Inertia.js
- **Asset Bundler:** Vite
- **Styling:** CSS3, SCSS, Bootstrap
- **Database:** MySQL

## ✨ Key Features

### Public-Facing Website
- **Dynamic Program Exploration:** Users can browse through various academic programs and specializations (e.g., MBA in Business Analytics, Digital Marketing, Industry Integrated).
- **Responsive Mobile-First Design:** A fully optimized experience across all devices, featuring custom mobile offcanvas menus and popups.
- **Interactive Elements:** Smooth animations, Swiper.js carousels for testimonials and banners, and a custom "Back to Top" navigation arrow.
- **Instant Communication:** Integrated WhatsApp Chat, Tawk.to live chat, and a custom Lead Generation Bot to capture user inquiries instantly.
- **Dynamic Settings:** All contact information (phone, email, address) and social media links are pulled directly from backend settings, making updates seamless.

### Admin Dashboard
- **Content Management:** Admins can dynamically add, edit, or remove Banners, Programs, Courses, and Testimonials.
- **Inquiry & Application Management:** Centralized dashboard to view and manage student applications and contact form submissions.
- **Site Settings Configuration:** Global settings manager to update site logos, favicons, contact details, and third-party script IDs without touching the codebase.
- **Role-Based Access Control:** Secure authentication system with user roles and permissions.

## 🛠️ Installation & Setup

To get this project running on your local machine for development and testing purposes, follow these steps:

### Prerequisites
- PHP >= 8.1
- Composer
- Node.js & NPM
- MySQL

### Step-by-Step Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TECLA-HRMS/Versatile-.git
   cd Versatile-
   ```

2. **Install PHP Dependencies:**
   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Copy the example `.env` file and configure your database credentials:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Run Migrations and Seeders:**
   *(Ensure your database is created and linked in the .env file before running this)*
   ```bash
   php artisan migrate --seed
   ```

6. **Link Storage:**
   Create the symbolic link for uploaded files (logos, banners, gallery images):
   ```bash
   php artisan storage:link
   ```

7. **Compile Assets:**
   For local development:
   ```bash
   npm run dev
   ```
   For production deployment:
   ```bash
   npm run build
   ```

8. **Start the Development Server:**
   ```bash
   php artisan serve
   ```
   Your application will now be running at `http://127.0.0.1:8000`.

## 📂 Deployment

When deploying to a live server (like cPanel or Forge):
1. Pull the latest code from the `main` branch.
2. Run `composer install --optimize-autoloader --no-dev`.
3. Run `npm install` and `npm run build` to generate the production assets.
4. Ensure your server points to the `/public` directory.
5. If using cPanel, you can simply zip the `public/build` folder locally and extract it directly into your live server's `public` directory.

## 📄 License

This project is proprietary and intended solely for the use of Versatile Business School and its administrators.
