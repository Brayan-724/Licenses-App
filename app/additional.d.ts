declare module "*.{css,scss,sass}" {
  export default undefined;
}

declare module "*.module.{css,scss,sass}" {
  type styles = Record<string, string>;
  export default styles;
}