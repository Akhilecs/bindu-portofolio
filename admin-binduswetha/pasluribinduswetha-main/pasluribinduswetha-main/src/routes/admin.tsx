import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { LayoutDashboard, User, BookOpen, Lightbulb, Award, Briefcase, Settings, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Profile Overview", href: "/admin/profile", icon: User },
    { label: "Publications", href: "/admin/publications", icon: BookOpen },
    { label: "Patents", href: "/admin/patents", icon: Lightbulb },
    { label: "Awards", href: "/admin/awards", icon: Award },
    { label: "Timeline", href: "/admin/timeline", icon: Briefcase },
    { label: "Skills & Memberships", href: "/admin/skills", icon: Settings },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">Portfolio Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted [&.active]:bg-primary/10 [&.active]:text-primary"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex flex-1 flex-col p-4 md:p-6 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}
