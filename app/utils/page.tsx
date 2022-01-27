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
import { MayBePromise } from "@typing/utils";
import { MainLayout } from "~/app/layouts/Main";

export interface IPageOptions<
  Props = {},
  StaticProps = {},
  ServerProps = {},
  Query extends ParsedUrlQuery = ParsedUrlQuery
> {
  layout?: Layout;
  layoutProps?: LayoutProps<Layout>;

  getInitialProps?: (
    context: NextPageContext
  ) => MayBePromise<Props & StaticProps & ServerProps>;

  getStaticPaths?: (
    context: GetStaticPathsContext
  ) => MayBePromise<GetStaticPathsResult<Query>>;

  getStaticProps?: (
    context: GetStaticPropsContext<Query>
  ) => MayBePromise<GetStaticPropsResult<StaticProps>>;

  getServerSideProps?: (
    context: GetServerSidePropsContext<Query>
  ) => MayBePromise<GetServerSidePropsResult<ServerProps>>;
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
