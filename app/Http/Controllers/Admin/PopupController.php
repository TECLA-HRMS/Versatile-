<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Popup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PopupController extends Controller
{
    public function index(Request $request)
    {
        $query = Popup::query();

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%");
        }

        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        $popups = $query->latest()->paginate(10)->withQueryString();
        return Inertia::render('Admin/Popups/Index', [
            'popups' => $popups,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Popups/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|max:5120',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('popups', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if (isset($data['is_active']) && $data['is_active']) {
            Popup::where('is_active', true)->update(['is_active' => false]);
        }

        Popup::create($data);

        return redirect()->route('admin.popups.index')->with('success', 'Popup created successfully.');
    }

    public function edit(Popup $popup)
    {
        return Inertia::render('Admin/Popups/Edit', [
            'popup' => $popup
        ]);
    }

    public function update(Request $request, Popup $popup)
    {
        $request->validate([
            'image' => 'nullable|image|max:5120',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($popup->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $popup->image));
            }
            $path = $request->file('image')->store('popups', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if (isset($data['is_active']) && $data['is_active']) {
            Popup::where('id', '!=', $popup->id)->update(['is_active' => false]);
        }

        $popup->update($data);

        return redirect()->route('admin.popups.index')->with('success', 'Popup updated successfully.');
    }

    public function toggleStatus(Popup $popup)
    {
        $newStatus = !$popup->is_active;
        if ($newStatus) {
            Popup::where('id', '!=', $popup->id)->update(['is_active' => false]);
        }
        $popup->update(['is_active' => $newStatus]);
        return redirect()->back()->with('success', 'Popup status updated successfully.');
    }

    public function destroy(Popup $popup)
    {
        if ($popup->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $popup->image));
        }
        $popup->delete();

        return redirect()->route('admin.popups.index')->with('success', 'Popup deleted successfully.');
    }
}
