declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;

  // eslint-disable-next-line import/no-default-export
  export default src;
}

interface Window {
  cp: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CloudPayments: any;
  };
}

declare module '*.docx' {
  const src: string;

  // eslint-disable-next-line import/no-default-export
  export default string;
}
