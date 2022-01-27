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
  Query extends ParsedUrlQuery = ParsedUrlQuery
> {
  layout?: Layout;
  layoutProps?: LayoutProps<Layout>;

  getInitialProps?: (context: NextPageContext) => MayBePromise<Props>;

  getStaticPaths?: (
    context: GetStaticPathsContext
  ) => MayBePromise<GetStaticPathsResult<Query>>;

  getStaticProps?: (
    context: GetStaticPropsContext<Query>
  ) => MayBePromise<GetStaticPropsResult<StaticProps>>;

  getServerSideProps?: (
    context: GetServerSidePropsContext<Query>
  ) => MayBePromise<GetServerSidePropsResult<Props & StaticProps>>;
}

export function page<
  Props = {},
  StaticProps = {},
  Query extends ParsedUrlQuery = ParsedUrlQuery
>(
  Component: Page<Props>,
  options: IPageOptions<Props, StaticProps, Query> = {}
) {
  const { layout = Layout.Default, layoutProps = {} } = options;

  const resultPage: ResultPage<Props, StaticProps, Query> = (props) => {
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

  resultPage.getInitialProps = options.getInitialProps;
  resultPage.getStaticPaths = options.getStaticPaths;
  resultPage.getStaticProps = options.getStaticProps;
  resultPage.getServerSideProps = options.getServerSideProps;

  return resultPage;
}
