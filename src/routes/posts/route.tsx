import { Card } from "@/components/ui/card";
import { getUser } from "@/data/users";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  beforeLoad: async ({ context }) => {
    if (!context.userSession.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: DashboardLayout,
  loader: async () => await getUser(),
});

export function DashboardLayout() {
  const user = Route.useLoaderData();
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