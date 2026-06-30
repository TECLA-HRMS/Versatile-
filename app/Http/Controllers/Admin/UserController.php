<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\UserWelcomeMail;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('role') && $request->role) {
            $query->whereHas('roles', function($q) use ($request) {
                $q->where('name', $request->role);
            });
        }

        $users = $query->paginate(10)->withQueryString();
        
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role'])
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password_type' => 'required|in:auto,manual',
            'password' => 'required_if:password_type,manual|nullable|string|min:8|confirmed',
            'send_email' => 'boolean',
            'roles' => 'array'
        ]);

        $rawPassword = $request->password_type === 'auto' ? Str::random(10) : $request->password;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($rawPassword),
            'is_admin' => $request->has('roles') && count($request->roles) > 0 ? true : false,
        ]);

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        }

        if ($request->boolean('send_email')) {
            Mail::to($user->email)->send(new UserWelcomeMail($user, $rawPassword));
        }

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        $roles = Role::all();
        $user->load('roles');
        
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password_type' => 'nullable|in:keep,auto,manual',
            'password' => 'required_if:password_type,manual|nullable|string|min:8|confirmed',
            'send_email' => 'boolean',
            'roles' => 'array'
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'is_admin' => $request->has('roles') && count($request->roles) > 0 ? true : false,
        ];

        $rawPassword = null;
        if ($request->password_type === 'auto') {
            $rawPassword = Str::random(10);
            $data['password'] = Hash::make($rawPassword);
        } elseif ($request->password_type === 'manual' && $request->filled('password')) {
            $rawPassword = $request->password;
            $data['password'] = Hash::make($rawPassword);
        }

        $user->update($data);

        if ($request->has('roles')) {
            $user->syncRoles($request->roles);
        } else {
            $user->syncRoles([]);
        }

        if ($request->boolean('send_email') && $rawPassword) {
            Mail::to($user->email)->send(new UserWelcomeMail($user, $rawPassword));
        }

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
