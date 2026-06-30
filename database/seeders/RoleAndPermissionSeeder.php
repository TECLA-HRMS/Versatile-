<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        $permissions = [
            // Dashboard
            'view dashboard',
            
            // Academics
            'view programs', 'create programs', 'edit programs', 'delete programs',
            'view courses', 'create courses', 'edit courses', 'delete courses',
            'view banners', 'create banners', 'edit banners', 'delete banners',
            'view popups', 'create popups', 'edit popups', 'delete popups',
            'view enquiries', 'delete enquiries',
            'view applications', 'delete applications',

            // System
            'view users', 'create users', 'edit users', 'delete users',
            'view roles', 'create roles', 'edit roles', 'delete roles',
            'manage notification emails',
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // create roles and assign created permissions
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->givePermissionTo(Permission::all());

        $editorRole = Role::firstOrCreate(['name' => 'Editor']);
        $editorRole->givePermissionTo(['view dashboard', 'view applications']);

        // Assign Admin role to existing admin users
        $adminUsers = User::with(['roles', 'permissions'])->where('is_admin', true)->get();
        foreach ($adminUsers as $user) {
            $user->assignRole($adminRole);
        }
    }
}
