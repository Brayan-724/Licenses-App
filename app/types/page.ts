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

import { MayBePromise } from "@typing/utils";

export enum Layout {
  None = "none",
  Default = "default",
}

export type LayoutProps<L extends Layout> = L extends Layout.None ? {} : {};

export type Page<P extends {} = {}> = FunctionComponent<P>;
export type ResultPage<
  Props extends {} = {},
  StaticProps extends {} = {},
  ServerProps extends {} = {},
  Query extends ParsedUrlQuery = ParsedUrlQuery
> = NextPage<Props & StaticProps & ServerProps> & {
  getStaticPaths?: (
    context: GetStaticPathsContext
  ) => MayBePromise<GetStaticPathsResult<Query>>;

  getStaticProps?: (
    context: GetStaticPropsContext<Query>
  ) => MayBePromise<GetStaticPropsResult<StaticProps>>;

  getServerSideProps?: (
    context: GetServerSidePropsContext<Query>
  ) => MayBePromise<GetServerSidePropsResult<ServerProps>>;

  layout?: Layout;
  layoutProps?: LayoutProps<Layout>;
};
