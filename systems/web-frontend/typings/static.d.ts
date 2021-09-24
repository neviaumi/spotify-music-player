declare module '*.svg' {
  const ref: React.RefForwardingComponent<
    SVGSVGElement,
    React.SVGAttributes<SVGSVGElement>
  >;
  // eslint-disable-next-line import/no-default-export
  export default ref;
}

declare module '*.png' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.gif' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}
