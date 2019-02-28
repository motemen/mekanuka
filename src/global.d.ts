declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "async-reactor" {
  export function asyncReactor<P, C>(
    f: (props: P) => Promise<C>,
    loader?: any,
    error?: any
  ): (props: P) => C;
}
