import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import budgetsRoutes from '@/routes/budgets';
import ElectricBorder from '@/components/ui/electric-border';
import Particles from '@/components/ui/particles';
import ShapeBlur from '@/components/ui/shape-blur';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const createForm = useForm({
        fiscal_year: new Date().getFullYear(),
        category: '',
        description: '',
        amount: '',
        status: 'draft',
    });

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(budgetsRoutes.store().url, {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            }
        });
    };

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
                            <h2 className="text-2xl font-bold tracking-tight">Budgets</h2>
                            <p className="text-muted-foreground">Manage your barangay budgets and financial allocations here.</p>
                        </div>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Budget
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] p-0 border-0 bg-transparent shadow-none overflow-visible">
                                {/* The animated shape blur acting as the border/background! */}
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <ShapeBlur
                                        variation={0}
                                        pixelRatioProp={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
                                         shapeSize={1}
                                        roundness={0.5}
                                        borderSize={0.05}
                                        circleSize={0.25}
                                        circleEdge={1}
                                    />
                                </div>
                                {/* Front Content Area */}
                                <div className="relative z-10 w-full h-full p-6 bg-card/80 backdrop-blur-xl rounded-lg border border-white/10 m-3">
                                    <DialogHeader>
                                        <DialogTitle>Create Budget</DialogTitle>
                                        <DialogDescription>
                                            Add a new financial allocation.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={submitCreate} className="space-y-4 pt-2">
                                        <div className="grid gap-2">
                                            <label htmlFor="fiscal_year" className="text-sm font-medium">Fiscal Year</label>
                                            <input id="fiscal_year" type="number"
                                                value={createForm.data.fiscal_year} onChange={(e) => createForm.setData('fiscal_year', Number(e.target.value))}
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required />
                                            {createForm.errors.fiscal_year && <p className="text-xs text-destructive">{createForm.errors.fiscal_year}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="category" className="text-sm font-medium">Category</label>
                                            <input id="category" type="text" placeholder="e.g. MOOE"
                                                value={createForm.data.category} onChange={(e) => createForm.setData('category', e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required />
                                            {createForm.errors.category && <p className="text-xs text-destructive">{createForm.errors.category}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="description" className="text-sm font-medium">Description</label>
                                            <textarea id="description" placeholder="Detailed description"
                                                value={createForm.data.description} onChange={(e) => createForm.setData('description', e.target.value)}
                                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required />
                                            {createForm.errors.description && <p className="text-xs text-destructive">{createForm.errors.description}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <label htmlFor="amount" className="text-sm font-medium">Amount (₱)</label>
                                                <input id="amount" type="number" step="0.01" placeholder="0.00"
                                                    value={createForm.data.amount} onChange={(e) => createForm.setData('amount', e.target.value)}
                                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" required />
                                                {createForm.errors.amount && <p className="text-xs text-destructive">{createForm.errors.amount}</p>}
                                            </div>
                                            <div className="grid gap-2">
                                                <label htmlFor="status" className="text-sm font-medium">Status</label>
                                                <select id="status" value={createForm.data.status} onChange={(e) => createForm.setData('status', e.target.value)}
                                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-zinc-950">
                                                    <option value="draft">Draft</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="disbursed">Disbursed</option>
                                                </select>
                                                {createForm.errors.status && <p className="text-xs text-destructive">{createForm.errors.status}</p>}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button variant="outline" type="button" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                            <Button type="submit" disabled={createForm.processing}>
                                                {createForm.processing ? 'Saving...' : 'Save Budget'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </DialogContent>

                        </Dialog>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <ElectricBorder
                            color="magenta"
                            speed={1}
                            chaos={0.12}
                            style={{ borderRadius: 16 }}
                        >
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                                    <p className="text-xs text-muted-foreground">Allocated for this fiscal year</p>
                                </CardContent>
                            </Card>
                        </ElectricBorder>
                        <ElectricBorder
                            color="magenta"
                            speed={1}
                            chaos={0.12}
                            style={{ borderRadius: 16 }}
                        >
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Spent</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(spentBudget)}</div>
                                    <p className="text-xs text-muted-foreground">Total expenditures</p>
                                </CardContent>
                            </Card>
                        </ElectricBorder>
                        <ElectricBorder
                            color="magenta"
                            speed={1}
                            chaos={0.12}
                            style={{ borderRadius: 16 }}
                        >
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(totalBudget - spentBudget)}</div>
                                    <p className="text-xs text-muted-foreground">Available balance</p>
                                </CardContent>
                            </Card>
                        </ElectricBorder>
                    </div>

                    <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm mt-4 overflow-hidden">
                        {budgets.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 h-full">
                                <p className="text-muted-foreground mb-4">No budgets found. Create one to get started.</p>
                                <Button variant="outline" onClick={() => setIsCreateOpen(true)}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Budget
                                </Button>
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
            </div>
        </AppLayout>
    );
}
