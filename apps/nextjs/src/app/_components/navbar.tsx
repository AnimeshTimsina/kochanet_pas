import React from "react";

import type { Session } from "@kochanet_pas/auth";

import { UserNav } from "./user-nav";

export interface INavbarProps {
  title?: string;
  content?: React.ReactNode;
  description?: string | null;
  user: Session["user"];
}

const Navbar: React.FC<INavbarProps> = ({
  content,
  description,
  title,
  user,
}) => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-2 overflow-hidden bg-background px-3 py-2 pt-4">
      <div>
        {content ? (
          content
        ) : (
          <div className="-ml-3 flex flex-col">
            <div className="text-xl font-medium text-primary">
              {title ?? ""}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {description ?? ""}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        <UserNav myInfo={user} />
      </div>
    </div>
  );
};

export default Navbar;
