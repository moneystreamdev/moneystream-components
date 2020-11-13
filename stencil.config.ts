import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'moneystream-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'components/moneystream-dash/assets', dest: 'assets' }
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
        { src: 'components/moneystream-dash/assets', dest: 'assets' },
        { src: 'components/moneystream-audio/assets', dest: 'assets' },
        { src: 'js', dest: 'build' }
      ]
    },
  ],
};
