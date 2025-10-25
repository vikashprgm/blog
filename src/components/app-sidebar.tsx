import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Sidebar, SidebarLink } from "@/components/ui/sidebar";
import type { User } from "@/data/auth";

export function AppSidebar({ user }: { user: User }) {
  return (
    <Sidebar>
      <div className="flex flex-col gap-2">
        <SidebarLink asChild>
          <Link to="/dashboard">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
        </SidebarLink>
      </div>
    </Sidebar>
  );
}
