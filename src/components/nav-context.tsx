"use client";

import { createContext, useContext, useState } from "react";

type NavCtxValue = { open: boolean; setOpen: (v: boolean) => void };

const NavCtx = createContext<NavCtxValue>({ open: false, setOpen: () => {} });

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <NavCtx.Provider value={{ open, setOpen }}>{children}</NavCtx.Provider>;
}

export const useNav = () => useContext(NavCtx);
