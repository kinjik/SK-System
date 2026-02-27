import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import budgets from '@/routes/budgets';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Budgets',
        href: budgets.index().url,
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Budgets" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Budgets</h2>
                        <p className="text-muted-foreground">Manage your barangay budgets and financial allocations here.</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₱0.00</div>
                            <p className="text-xs text-muted-foreground">Allocated for this fiscal year</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Spent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₱0.00</div>
                            <p className="text-xs text-muted-foreground">Total expenditures</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₱0.00</div>
                            <p className="text-xs text-muted-foreground">Available balance</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm p-8 text-center mt-4">
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-muted-foreground">No budgets found. Create one to get started.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
