import Link from 'next/link';
import SideNavigation from '@/app/_components/SideNavigation';

export default function AccountLayout({ children }) {
  return (
    <div className="h-full grid gap-8 grid-cols-[16rem_1fr] flex-1">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
