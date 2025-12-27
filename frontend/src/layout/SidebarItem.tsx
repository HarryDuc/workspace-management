import type { LucideIcon } from "lucide-react";
import { Workspace } from "../types";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";

interface SidebarNavProps extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  currentWorkspace: Workspace | null;
  className?: string;
}
export const SidebarItem = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}: SidebarNavProps) => {
  const location = usePathname();
  const navigate = useRouter();

  return (
    <nav className={cn("flex flex-col gap-y-2", className)} {...props}>
      {items.map((el) => {
        const Icon = el.icon;
        const isActive = location === el.href;

        const handleClick = () => {
          if (el.href === "/workspaces") {
            navigate.push(el.href);
          } else if (currentWorkspace && currentWorkspace._id) {
            navigate.push(`${el.href}?workspaceId=${currentWorkspace._id}`);
          } else {
            navigate.push(el.href);
          }
        };

        return (
          <Button
            key={el.href}
            variant={isActive ? "outline" : "ghost"}
            className={cn(
              "justify-start",
              isActive && "bg-blue-800/20 text-blue-600 font-medium"
            )}
            onClick={handleClick}
          >
            <Icon className="mr-2 size-4" />
            {isCollapsed ? (
              <span className="sr-only">{el.title}</span>
            ) : (
              el.title
            )}
          </Button>
        );
      })}
    </nav>
  );
};
