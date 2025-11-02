import { Card } from "@/components/ui/card";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

export function DashboardLayout() {
  const user = Route.useLoaderData();
  return (
    <div>
      Hi
    </div>
  );
}