import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import budgetsRoutes from '@/routes/budgets';
import Particles from '@/components/ui/particles';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Budgets', href: budgetsRoutes.index().url },
    { title: 'Create', href: budgetsRoutes.create().url },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        fiscal_year: new Date().getFullYear(),
        category: '',
        description: '',
        amount: '',
        status: 'draft',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(budgetsRoutes.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Budget" />
            <div className="relative flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-hidden">
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
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Create Budget</h2>
                            <p className="text-muted-foreground">Add a new financial allocation to the system.</p>
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
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    required
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="amount" className="text-sm font-medium">Amount (₱)</label>
                                <input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    required
                                />
                                {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
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
                                    {processing ? 'Saving...' : 'Save Budget'}
                                </Button>
                                <Link href={budgetsRoutes.index().url} className="text-sm text-muted-foreground hover:underline">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
