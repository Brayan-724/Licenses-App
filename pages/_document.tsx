import React from "react";

import Document, { DocumentContext } from "next/document";
import type { NextComponentType, NextPageContext } from "next"
import type { NextRouter } from "next/router";
import type { AppType } from "next/dist/shared/lib/utils";

import { ServerStyleSheet } from "styled-components";

/**
 * https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components#add-the-server-stylesheet
 * Add styles to document
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp:
            (App: AppType) =>
            (props: {
              pageProps: {};
              Component: NextComponentType<NextPageContext, {}, {}>;
              router: NextRouter;
            }) =>
              sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
