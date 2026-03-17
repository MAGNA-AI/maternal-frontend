import {
  Home,
  MessageCircle,
  Settings,
  Heart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "New Chat", url: "/chat", icon: MessageCircle, requiresAuth: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-display font-semibold text-lg text-foreground">
              MamaCare
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const active = location.pathname === item.url;
                const disabled = Boolean(item.requiresAuth && !user);
                return (
                  <SidebarMenuItem key={item.title}>
                    {disabled ? (
                      <div
                        className={cn(
                          "rounded-xl px-3 py-2.5 text-muted-foreground opacity-60 cursor-not-allowed select-none",
                          "flex items-center"
                        )}
                        title="Sign in to start a new chat"
                        aria-disabled="true"
                      >
                        <item.icon className="mr-3 h-[18px] w-[18px] shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </div>
                    ) : (
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={`rounded-xl px-3 py-2.5 transition-colors hover:bg-accent ${active ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"}`}
                          activeClassName="bg-accent text-accent-foreground font-medium"
                        >
                          <item.icon className="mr-3 h-[18px] w-[18px] shrink-0" />
                          {!collapsed && <span className="text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 pb-4">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/settings"
                    end
                    className={`rounded-xl px-3 py-2.5 transition-colors hover:bg-accent ${
                      location.pathname === "/settings"
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                    activeClassName="bg-accent text-accent-foreground font-medium"
                  >
                    <Settings className="mr-3 h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span className="text-sm">Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
