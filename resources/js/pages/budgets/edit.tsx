import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import budgetsRoutes from '@/routes/budgets';

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
    budget: Budget;
}

export default function Edit({ budget }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Budgets', href: budgetsRoutes.index().url },
        { title: 'Edit', href: budgetsRoutes.edit({ budget: budget.id }).url },
    ];

    const { data, setData, put, processing, errors } = useForm({
        fiscal_year: budget.fiscal_year,
        category: budget.category,
        description: budget.description,
        amount: budget.amount,
        spent: budget.spent,
        status: budget.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(budgetsRoutes.update({ budget: budget.id }).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Budget - ${budget.category}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 md:p-6 max-w-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Edit Budget</h2>
                        <p className="text-muted-foreground">Update the details of this financial allocation.</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm mt-4 p-6 overflow-hidden">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <label htmlFor="fiscal_year" className="text-sm font-medium">Fiscal Year</label>
                            <input
                                id="fiscal_year"
                                type="number"
                                value={data.fiscal_year}
                                onChange={(e) => setData('fiscal_year', Number(e.target.value))}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-zinc-950"
                                required
                            />
                            {errors.fiscal_year && <p className="text-sm text-destructive">{errors.fiscal_year}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="category" className="text-sm font-medium">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="e.g. MOOE, SK Funds, Capital Outlay"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-zinc-950"
                                required
                            />
                            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="description" className="text-sm font-medium">Description</label>
                            <textarea
                                id="description"
                                placeholder="Detailed description of this budget constraint"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-zinc-950"
                                required
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="amount" className="text-sm font-medium">Allocated Amount (₱)</label>
                                <input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-zinc-950"
                                    required
                                />
                                {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="spent" className="text-sm font-medium">Spent Amount (₱)</label>
                                <input
                                    id="spent"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={data.spent}
                                    onChange={(e) => setData('spent', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-zinc-950"
                                />
                                {errors.spent && <p className="text-sm text-destructive">{errors.spent}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="status" className="text-sm font-medium">Status</label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-zinc-950"
                            >
                                <option value="draft">Draft</option>
                                <option value="approved">Approved</option>
                                <option value="disbursed">Disbursed</option>
                            </select>
                            {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Budget'}
                            </Button>
                            <Link href={budgetsRoutes.index().url} className="text-sm text-muted-foreground hover:underline">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
