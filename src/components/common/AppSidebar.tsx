"use client";

import * as React from "react";
import { Home, BookPlus, Users, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ScrollArea,
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/";

const menuItems = [
  // { icon: Home, label: "Tableau de bord", href: "/admin/dashboard" },
  // { icon: Users, label: "Utilisateurs", href: "/admin/users" },
  { icon: BookPlus, label: "Annonces", href: "/admin/ads" },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState("Annonces");
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar className="border-r w-72">
      <SidebarHeader className="px-2">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-lg font-semibold tracking-tight">Application</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeItem === item.label}
                      onClick={() => setActiveItem(item.label)}
                    >
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          activeItem === item.label
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <div className="flex items-center justify-between p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      session?.user?.image || "https://github.com/shadcn.png"
                    }
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <p className="text-sm font-medium">
                    {session?.user?.name || "Nassim Shimo"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.email || "shimo@gmail.com"}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
