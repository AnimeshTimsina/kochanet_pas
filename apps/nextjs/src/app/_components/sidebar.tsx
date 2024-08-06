"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import type { Session } from "@kochanet_pas/auth";
import { Button } from "@kochanet_pas/ui/button";

import { routes } from "~/routes";
import Navbar from "./navbar";

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: Session["user"];
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (name: string) => pathname.includes(name);

  const getActiveRoute = () => {
    const activeRoute = routes.find((e) => isActive(e.route));
    return activeRoute!;
  };
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="w-52">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col justify-between overflow-y-auto pt-5">
            <div className="flex flex-col gap-12">
              <div className="flex flex-shrink-0 items-center justify-center px-4">
                <h1 className="text-center text-2xl font-extrabold tracking-tight">
                  Kochanet <span className="text-primary">PAS</span>
                </h1>
              </div>
              <nav className="flex-1 space-y-1 px-5">
                {routes.map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => router.push(item.route)}
                    variant={isActive(item.route) ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.route)
                        ? "text-gray-950 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <item.icon
                      className={classNames("mr-3 h-4 w-4 flex-shrink-0")}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Content area */}
      <div className="flex flex-1 overflow-auto focus:outline-none">
        <main className="relative z-0 flex flex-1 overflow-y-hidden">
          <div className="flex flex-1 flex-col gap-1">
            <Navbar
              user={user}
              title={getActiveRoute().name}
              description={getActiveRoute().description}
            />

            <div className="flex-1 overflow-y-auto border-l border-t border-l-border border-t-border py-4 pl-4 pr-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
