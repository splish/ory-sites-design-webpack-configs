const path = require('path');

module.exports = (entry, outputPath = path.resolve(__dirname, 'dist')) => {
  const createConfig = (target, filename) => ({
    target,
    entry,
    output: {
      path: outputPath,
      filename,
      publicPath: '.',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: path.join(__dirname, '..', '..', '..', 'node_modules'),
          loader: require.resolve('babel-loader')
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
        }
      ]
    },
    externals: {
      'material-ui': 'material-ui',
      'ory-editor-plugins-slate': 'ory-editor-plugins-slate',
      'ory-editor-ui': 'ory-editor-ui',
      react: 'react',
      'react-helmet': 'react-helmet'
    }
  });

  return [createConfig('web', 'web.js'), createConfig('node', 'node.js')];
};
