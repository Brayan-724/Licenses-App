import React from "react";
import type {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPageContext,
} from "next";
import { ResultPage, Page, Layout, LayoutProps } from "~/app/types/page";
import { ParsedUrlQuery } from "querystring";
import { Awaitable } from "@typing/utils";
import { MainLayout } from "@layouts/Main";
import { AdminLayout } from "@layouts/Admin";

export interface IPageOptions<
  Props = {},
  StaticProps = {},
  ServerProps = {},
  Query extends ParsedUrlQuery = ParsedUrlQuery
> {
  layout?: Layout;
  layoutProps?: LayoutProps<Layout>;

  getInitialProps?: (context: NextPageContext) => Awaitable<Props & StaticProps & ServerProps>;

  getStaticPaths?: (
    context: GetStaticPathsContext
  ) => Awaitable<GetStaticPathsResult<Query>>;

  getStaticProps?: (
    context: GetStaticPropsContext<Query>
  ) => Awaitable<GetStaticPropsResult<StaticProps>>;

  getServerSideProps?: (
    context: GetServerSidePropsContext<Query>
  ) => Awaitable<GetServerSidePropsResult<ServerProps>>;
}

export function page<
  Props = {},
  StaticProps = {},
  ServerProps = {},
  Query extends ParsedUrlQuery = ParsedUrlQuery
>(
  Component: Page<Props & StaticProps & ServerProps>,
  options: IPageOptions<Props, StaticProps, ServerProps, Query> = {}
) {
  const { layout = Layout.Default, layoutProps = {} } = options;

  const resultPage: ResultPage<Props, StaticProps, ServerProps, Query> = (
    props
  ) => {
    if (layout === Layout.None) {
      return <Component {...props} />;
    }

    if(layout === Layout.Admin) {
      return (
        <AdminLayout {...layoutProps}>
          <Component {...props} />
        </AdminLayout>
      )
    }

    return (
      <MainLayout {...layoutProps}>
        <Component {...props} />
      </MainLayout>
    );
  };

  resultPage.layout = layout;
  resultPage.layoutProps = layoutProps;

  return {
    page: resultPage,
    getInitialProps: options.getInitialProps || undefined,
    getStaticPaths: options.getStaticPaths || undefined,
    getStaticProps: options.getStaticProps || undefined,
    getServerSideProps: options.getServerSideProps || undefined,
  };
}
