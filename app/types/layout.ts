import React from "react";

export type Layout<Props extends LayoutProps = LayoutProps> = React.FunctionComponent<Props>;
export type LayoutProps<Props = {}> = Props & { children: React.ReactNode };
