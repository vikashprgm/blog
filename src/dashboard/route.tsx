import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PathBreadcrumbs } from '@/components/path-breadcrumbs';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { UserNav } from '@/components/user-nav';
import { User } from '@/data/auth'; // Import User from auth.ts

export const Route = createFileRoute('/dashboard')({
  // This is the auth check!
  beforeLoad: async ({ context }) => {
    // context.userSession was provided by __root.tsx
    if (!context.userSession) {
      // Not logged in! Redirect to the login page.
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: DashboardLayout,
});

export function DashboardLayout() {
  // We can safely get the user from context
  const { userSession } = Route.useRouteContext();
  const user = userSession as User; // We know it's not null here

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <PathBreadcrumbs />
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <UserNav user={user} />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}