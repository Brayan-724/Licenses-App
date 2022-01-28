import type { FunctionComponent } from "react";
import type {
  NextPage,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import type { ParsedUrlQuery } from "querystring";

import { Awaitable } from "@typing/utils";

export enum Layout {
  None = "none",
  Default = "default",
  Admin = "admin",
}

export type LayoutProps<L extends Layout> = L extends Layout.None
  ? {}
  : L extends Layout.Admin
  ? {}
  : {};

export type Page<P extends {} = {}> = FunctionComponent<P>;
export type ResultPage<
  Props extends {} = {},
  StaticProps extends {} = {},
  ServerProps extends {} = {},
  Query extends ParsedUrlQuery = ParsedUrlQuery
> = NextPage<Props & StaticProps & ServerProps> & {
  getStaticPaths?: (
    context: GetStaticPathsContext
  ) => Awaitable<GetStaticPathsResult<Query>>;

  getStaticProps?: (
    context: GetStaticPropsContext<Query>
  ) => Awaitable<GetStaticPropsResult<StaticProps>>;

  getServerSideProps?: (
    context: GetServerSidePropsContext<Query>
  ) => Awaitable<GetServerSidePropsResult<ServerProps>>;

  layout?: Layout;
  layoutProps?: LayoutProps<Layout>;
};
