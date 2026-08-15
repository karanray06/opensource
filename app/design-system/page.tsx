"use client";

import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState, Skeleton } from "@/components/states/LoadingState";
import { OfflineState } from "@/components/states/OfflineState";
import { PermissionDenied } from "@/components/states/PermissionDenied";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Pagination } from "@/components/ui/Pagination";
import { Filters, FilterDefinition } from "@/components/ui/Filters";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";
import { Drawer } from "@/components/ui/Drawer";
import { useToast } from "@/components/ui/Toast";
import * as React from "react";

export default function DesignSystemStates() {
	const { toast } = useToast();
	const [currentPage, setCurrentPage] = React.useState(1);
	const [filterValues, setFilterValues] = React.useState<Record<string, string>>({});
	
	const filterDefs: FilterDefinition[] = [
		{
			id: "status",
			label: "Status",
			options: [
				{ label: "Open", value: "open" },
				{ label: "Closed", value: "closed" }
			]
		}
	];

	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	return (
		<div className="shell py-12 space-y-16">
			<div>
				<h1 className="text-3xl font-extrabold mb-4">Design System</h1>
				<p className="text-muted mb-8 max-w-2xl">
					A showcase of all the shared components used throughout the
					application. Includes inputs, tables, overlays, and state components.
				</p>
			</div>

			<section>
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-black text-bg">
						1
					</span>
					Core Inputs
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">Buttons</h3>
						<div className="flex flex-wrap gap-4">
							<Button variant="primary">Primary</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="ghost">Ghost</Button>
							<Button disabled>Disabled</Button>
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">Forms</h3>
						<div className="space-y-4">
							<Input placeholder="Input field..." />
							<Select>
								<option value="1">Option 1</option>
								<option value="2">Option 2</option>
							</Select>
						</div>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-black text-bg">
						2
					</span>
					Navigation & Data
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">Pagination & Filters</h3>
						<div className="space-y-6">
							<Filters
								filters={filterDefs}
								filterValues={filterValues}
								onFilterChange={(id, value) => setFilterValues(prev => ({ ...prev, [id]: value }))}
								onClearFilters={() => setFilterValues({})}
							/>
							<Pagination
								currentPage={currentPage}
								totalPages={10}
								onPageChange={setCurrentPage}
							/>
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">Table</h3>
						<div className="rounded-xl border border-muted/20 bg-card overflow-hidden">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>User</TableHead>
										<TableHead>Role</TableHead>
										<TableHead className="text-right">Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">Jane Doe</TableCell>
										<TableCell>Admin</TableCell>
										<TableCell className="text-right">Active</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">John Smith</TableCell>
										<TableCell>Contributor</TableCell>
										<TableCell className="text-right">Inactive</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-black text-bg">
						3
					</span>
					Overlays & Notifications
				</h2>
				<div className="flex flex-wrap gap-4">
					<Button onClick={() => setIsDialogOpen(true)} variant="secondary">Open Dialog</Button>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogHeader>
							<DialogTitle>Edit Profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<div className="py-4 space-y-4">
							<Input placeholder="Name" />
							<Input placeholder="Username" />
						</div>
						<DialogFooter>
							<Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
							<Button type="submit" onClick={() => setIsDialogOpen(false)}>Save changes</Button>
						</DialogFooter>
					</Dialog>

					<Button onClick={() => setIsDrawerOpen(true)} variant="secondary">Open Drawer</Button>
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<div className="p-4 flex flex-col gap-4">
							<h2 className="text-lg font-semibold text-text-bright">Are you absolutely sure?</h2>
							<p className="text-sm text-muted">This action cannot be undone.</p>
							<Button variant="primary" className="w-full mt-4" onClick={() => setIsDrawerOpen(false)}>Confirm</Button>
							<Button variant="secondary" className="w-full" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
						</div>
					</Drawer>

					<Button 
						onClick={() => toast({ title: "Success", description: "Your changes have been saved.", type: "success" })}
						variant="secondary"
					>
						Show Toast
					</Button>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-black text-bg">
						4
					</span>
					Loading States
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-2">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">
							Spinner
						</h3>
						<div className="rounded-xl border border-muted/20 bg-card p-4">
							<LoadingState text="Loading data..." />
						</div>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">
							Skeleton
						</h3>
						<div className="rounded-xl border border-muted/20 bg-card p-8">
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-4">
									<Skeleton className="h-12 w-12 rounded-full" />
									<div className="space-y-2">
										<Skeleton className="h-4 w-[250px]" />
										<Skeleton className="h-4 w-[200px]" />
									</div>
								</div>
								<Skeleton className="h-[200px] w-full rounded-xl" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-black text-bg">
						5
					</span>
					Error & Offline
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-2">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">
							General Error
						</h3>
						<ErrorState
							title="Failed to load dashboard"
							message="The server responded with a 500 status code. Our team has been notified."
							onRetry={() => console.log("retrying...")}
						/>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">
							Offline
						</h3>
						<OfflineState onRetry={() => console.log("retrying...")} />
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-bold mb-6 flex items-center gap-2">
					<span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-black text-bg">
						6
					</span>
					Empty & Permission
				</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-2">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">
							Empty Data
						</h3>
						<EmptyState
							title="No issues found"
							description="There are currently no open issues in this workspace that match your filters."
							action={
								<Button className="mt-4">
									Create Issue
								</Button>
							}
						/>
					</div>
					<div className="space-y-2">
						<h3 className="font-semibold text-sm text-muted uppercase tracking-wider">
							Permission Denied
						</h3>
						<PermissionDenied message="You need Admin privileges to view the settings for this workspace." />
					</div>
				</div>
			</section>
		</div>
	);
}
