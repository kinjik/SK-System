import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Wallet, FolderKanban, Users, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

// Define the shape of the props coming from our Controller
interface DashboardProps {
    totalBudget: number;
    spentBudget: number;
    activeProjectsCount: number;
    completedProjectsCount: number;
    upcomingMeetingsCount: number;
}

export default function Dashboard({ 
    totalBudget, 
    spentBudget, 
    activeProjectsCount, 
    completedProjectsCount,
    upcomingMeetingsCount 
}: DashboardProps) {
    
    // Helper to format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                
                <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>

                {/* Number Cards Row */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    
                    {/* Budget Card */}
                    <div className="flex flex-col gap-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between text-muted-foreground">
                            <span className="text-sm font-medium">Total Budget</span>
                            <Wallet className="size-4" />
                        </div>
                        <span className="text-2xl font-bold">{formatCurrency((totalBudget || 0))}</span>
                        <span className="text-xs text-muted-foreground mt-1">
                            {formatCurrency((spentBudget || 0))} spent
                        </span>
                    </div>

                    {/* Active Projects Card */}
                    <div className="flex flex-col gap-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between text-muted-foreground">
                            <span className="text-sm font-medium">Active Projects</span>
                            <FolderKanban className="size-4" />
                        </div>
                        <span className="text-2xl font-bold">{activeProjectsCount || 0}</span>
                        <span className="text-xs text-muted-foreground mt-1">Currently ongoing</span>
                    </div>

                    {/* Completed Projects Card */}
                    <div className="flex flex-col gap-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between text-muted-foreground">
                            <span className="text-sm font-medium">Completed Projects</span>
                            <CheckCircle className="size-4" />
                        </div>
                        <span className="text-2xl font-bold">{completedProjectsCount || 0}</span>
                        <span className="text-xs text-muted-foreground mt-1">Successfully finished</span>
                    </div>

                    {/* Upcoming Meetings Card */}
                    <div className="flex flex-col gap-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between text-muted-foreground">
                            <span className="text-sm font-medium">Upcoming Meetings</span>
                            <Users className="size-4" />
                        </div>
                        <span className="text-2xl font-bold">{upcomingMeetingsCount || 0}</span>
                        <span className="text-xs text-muted-foreground mt-1">Scheduled sessions</span>
                    </div>

                </div>

                {/* Bottom Main Content Area */}
                <div className="min-h-[400px] flex-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <p>No recent activity right now. Start by adding a Budget!</p>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
