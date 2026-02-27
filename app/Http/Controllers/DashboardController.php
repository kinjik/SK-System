<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Meeting;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBudget = Budget::sum('amount');
        $spentBudget = Budget::sum('spent');
        
        $activeProjectsCount = Project::where('status', 'ongoing')->count();
        $completedProjectsCount = Project::where('status', 'completed')->count();
        
        $upcomingMeetingsCount = Meeting::where('status', 'scheduled')->count();

        // We pass this data to the React component
        return Inertia::render('dashboard', [
            'totalBudget' => $totalBudget,
            'spentBudget' => $spentBudget,
            'activeProjectsCount' => $activeProjectsCount,
            'completedProjectsCount' => $completedProjectsCount,
            'upcomingMeetingsCount' => $upcomingMeetingsCount,
        ]);
    }
}
