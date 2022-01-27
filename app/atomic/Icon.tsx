import * as React from "react";
import styled from "styled-components";

const StyledIcon = styled.span/*css*/ `
  & {
    font-family: "Material Icons";
    font-weight: normal;
    font-style: normal;
    font-size: ${(props: IIconProps) =>
      typeof props.size === "string"
        ? props.size
        : (props.size || "24") + "px"}; /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: "liga";
  }
`;

export interface IIconProps {
  children?: React.ReactText;
  name?: string;
  size?: number | string;
  className?: string;
}

export function Icon(props: IIconProps) {
  return (
    <StyledIcon {...props}>
      {((props.name || props.children || "") + "").toLowerCase()}
    </StyledIcon>
  );
}
