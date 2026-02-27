import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import budgetsRoutes from '@/routes/budgets';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Budgets',
        href: budgetsRoutes.index().url,
    },
];

interface Budget {
    id: number;
    fiscal_year: number;
    category: string;
    description: string;
    amount: string;
    spent: string;
    status: string;
}

interface Props {
    budgets: Budget[];
    totalBudget: number;
    spentBudget: number;
}

export default function Index({ budgets, totalBudget, spentBudget }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this budget?')) {
            destroy(budgetsRoutes.destroy({ budget: id }).url);
        }
    };

    const formatCurrency = (amount: number | string) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(Number(amount));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Budgets" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Budgets</h2>
                        <p className="text-muted-foreground">Manage your barangay budgets and financial allocations here.</p>
                    </div>
                    <Link href={budgetsRoutes.create().url}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Budget
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                            <p className="text-xs text-muted-foreground">Allocated for this fiscal year</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Spent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(spentBudget)}</div>
                            <p className="text-xs text-muted-foreground">Total expenditures</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalBudget - spentBudget)}</div>
                            <p className="text-xs text-muted-foreground">Available balance</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm mt-4 overflow-hidden">
                    {budgets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 h-full">
                            <p className="text-muted-foreground mb-4">No budgets found. Create one to get started.</p>
                            <Link href={budgetsRoutes.create().url}>
                                <Button variant="outline">
                                    <Plus className="mr-2 h-4 w-4" /> Add Budget
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Year</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Budget</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {budgets.map((budget) => (
                                        <tr key={budget.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">{budget.fiscal_year}</td>
                                            <td className="p-4 align-middle font-medium">{budget.category}</td>
                                            <td className="p-4 align-middle">{budget.description}</td>
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col">
                                                    <span>{formatCurrency(budget.amount)}</span>
                                                    <span className="text-xs text-muted-foreground">Spent: {formatCurrency(budget.spent)}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize
                                                    ${budget.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                                                    ${budget.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                                                    ${budget.status === 'disbursed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}`}>
                                                    {budget.status}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link href={budgetsRoutes.edit({ budget: budget.id }).url}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Pencil className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive focus:text-destructive"
                                                        onClick={() => handleDelete(budget.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
