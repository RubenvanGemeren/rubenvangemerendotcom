"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"
import { useI18n } from "@/lib/i18n-context";

const components: { title: string; href: string }[] = [
  {
    title: "experience",
    href: "/experience"
  },
  {
    title: "projects",
    href: "/projects"
  },
  {
    title: "blog",
    href: "/blog"
  },
  {
    title: "about",
    href: "/about"
  }
]

export function NavigationMenuDemo() {
  const { t } = useI18n();
  return (
    <NavigationMenu>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={t(`common.nav.${component.title}`)}
                  href={component.href}
                >
                  {t(`common.nav.${component.title}_description`)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}><div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium ml-2 py-2">{title}</div>
          {/* <div className="text-muted-foreground line-clamp-2">{children}</div> */}
        </div></Link>
        </NavigationMenuLink>
    </li>
  )
}
