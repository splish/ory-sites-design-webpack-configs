const webpack = require('webpack');
const path = require('path');

const createConfigs = require('.');

it('dummy template can be compiled without errors or warnings', done => {
  const configs = createConfigs(
    path.join(__dirname, '__mocks__', 'index.js'),
    path.resolve(__dirname, '..', 'tmp')
  );

  webpack(configs, (err, stats) => {
    if (err) {
      return done(err);
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      return done(info.errors);
    }

    if (stats.hasWarnings()) {
      return done(info.warnings);
    }

    done();
  });
});
