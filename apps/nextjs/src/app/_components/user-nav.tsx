"use client";

import * as React from "react";
import { LogOutIcon } from "lucide-react";

import type { Session } from "@kochanet_pas/auth";
import { signOut } from "@kochanet_pas/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@kochanet_pas/ui/avatar";
import { Button } from "@kochanet_pas/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@kochanet_pas/ui/dropdown-menu";

import { logout } from "~/actions";
import { getInitials } from "../../../../../packages/utils/dist";

export function UserNav({ myInfo }: { myInfo: Session["user"] }) {
  const { name, image, email } = myInfo;
  const initials = name ? getInitials(name) : "U";
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full ring-2 ring-primary"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={image ?? "/avatars/01.png"} alt="user image" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              void logout();
            }}
          >
            {"Sign out"}
            <DropdownMenuShortcut>
              <LogOutIcon className="h-3 w-3" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
