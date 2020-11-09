import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'moneystream-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'fonts', dest: 'moneystream-components' }
      ]
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'wmreverse.html', dest: 'wmreverse.html' },
        { src: 'fonts', dest: 'build' },
        { src: 'js', dest: 'build' }
      ]
    },
  ],
};
