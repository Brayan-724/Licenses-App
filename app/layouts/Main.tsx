import * as React from "react";
import type { PropsWithChildren } from "react";
import Link from "next/link";
import { LayoutProps } from "@typing/layout";

export interface IMainLayoutProps extends LayoutProps {}

export function MainLayout(props: IMainLayoutProps) {
  return (
    <>
      <div className="h-20 fixed py-4 px-6 bg-slate-600 flex justify-between items-center w-full text-white">
        <div className="w-14 h-14 bg-black text-transparent">Logo</div>
        <div className="flex gap-5">
          <Tab href="/">Home</Tab>
          <Tab href="/search">Search</Tab>
          <Tab href="/admin">Admin</Tab>
        </div>
      </div>

      <div className="h-full pt-20 overflow-auto">
        {props.children}
      </div>
    </>
  );
}


function Tab({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <Link href={href} passHref={true}>
      <a className="text-white uppercase font-semibold hover:text-gray-400">
        {children}
      </a>
    </Link>
  );
}
