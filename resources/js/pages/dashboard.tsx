import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Wallet, FolderKanban, Users, CheckCircle } from 'lucide-react';
import ElectricBorder from '@/components/ui/electric-border';
import Particles from '@/components/ui/particles';
import ShapeBlur from '@/components/ui/shape-blur';

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
            <div className="relative flex h-full flex-1 flex-col gap-6 p-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Particles
                        particleCount={200}
                        particleSpread={10}
                        speed={0.1}
                        particleColors={['#ffffff', '#ffffff', '#ffffff']}
                        moveParticlesOnHover={true}
                        particleHoverFactor={1}
                        alphaParticles={false}
                        particleBaseSize={100}
                        sizeRandomness={1}
                        cameraDistance={20}
                        disableRotation={false}
                        pixelRatio={1}
                    />
                </div>
                {/* --- FRONT LAYER (Z-10) --- */}
                <div className="relative z-10 flex flex-col gap-6 w-full h-full">
                    <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
                    <p className="text-muted-foreground">Here's what's happening with your barangay's finances and projects.</p>

                    {/* Number Cards Row */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {/* Budget Card */}
                        <ElectricBorder
                            color="cyan"
                            speed={0.5}
                            chaos={0.12}
                            style={{ borderRadius: 16 }}
                        >
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
                        </ElectricBorder>

                        {/* Active Projects Card */}
                        <ElectricBorder
                            color="cyan"
                            speed={0.5}
                            chaos={0.12}
                            style={{ borderRadius: 16 }}
                        >
                            <div className="flex flex-col gap-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="text-sm font-medium">Active Projects</span>
                                    <FolderKanban className="size-4" />
                                </div>
                                <span className="text-2xl font-bold">{activeProjectsCount || 0}</span>
                                <span className="text-xs text-muted-foreground mt-1">Currently ongoing</span>
                            </div>
                        </ElectricBorder>

                        {/* Completed Projects Card */}
                        <ElectricBorder
                            color="cyan"
                            speed={0.5}
                            chaos={0.12}
                            style={{ borderRadius: 16 }}
                        >
                            <div className="flex flex-col gap-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="text-sm font-medium">Completed Projects</span>
                                    <CheckCircle className="size-4" />
                                </div>
                                <span className="text-2xl font-bold">{completedProjectsCount || 0}</span>
                                <span className="text-xs text-muted-foreground mt-1">Successfully finished</span>
                            </div>
                        </ElectricBorder>

                        {/* Upcoming Meetings Card */}
                        <ElectricBorder
                            color="cyan"
                            speed={0.5}
                            chaos={0.12}
                            style={{ borderRadius: 16 }}
                        >
                            <div className="flex flex-col gap-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between text-muted-foreground">
                                    <span className="text-sm font-medium">Upcoming Meetings</span>
                                    <Users className="size-4" />
                                </div>
                                <span className="text-2xl font-bold">{upcomingMeetingsCount || 0}</span>
                                <span className="text-xs text-muted-foreground mt-1">Scheduled sessions</span>
                            </div>
                        </ElectricBorder>
                    </div>

                    {/* Bottom Main Content Area */}
                    <div className="min-h-[400px] flex-1 rounded-xl border border-sidebar-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <p>No recent activity right now. Start by adding a Budget!</p>
                        </div>
                    </div>

                </div> {/* End Front Layer */}

            </div>
        </AppLayout>
    );
}
