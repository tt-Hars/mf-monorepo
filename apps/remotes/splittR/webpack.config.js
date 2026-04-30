const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  name: 'splittR',
  library: { type: 'var', name: 'splittR' },
  exposes: {
    './app': './src/app.ts',
    './Component': './src/app/app.component.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

module.exports = {
  ...mfConfig,
  output: {
    ...mfConfig.output,
    scriptType: 'text/javascript'
  }
};
