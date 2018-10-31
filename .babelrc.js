module.exports = {
  presets: [
    '@babel/preset-flow',
    [
      '@babel/preset-stage-0',
      {
        decoratorsLegacy: true,
      },
    ],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    'add-module-exports',
  ],
  env: {
    production: {
      comments: false,
      compact: true,
    },
  },
};

