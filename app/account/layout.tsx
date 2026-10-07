import SideNavigation from '@/app/_components/SideNavigation';

export default function AccountLayout({ children }: LayoutProps<'/account'>) {
	return (
		<div className="min-h-[calc(100vh-197px)] grid gap-8 grid-cols-[4rem_1fr] md:grid-cols-[16rem_1fr] flex-1 relative">
			<SideNavigation />
			<div className="">{children}</div>
		</div>
	);
}
