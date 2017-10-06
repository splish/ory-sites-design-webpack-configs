# ory-sites-design-webpack-configs

[![Build Status](https://travis-ci.org/splish-me/ory-sites-design-webpack-configs.svg?branch=master)](https://travis-ci.org/splish-me/ory-sites-design-webpack-configs)

Webpack configs to pre-compile ORY Sites designs for consumption in app. Handles stuff bundled in ORY Sites app as webpack externals and creates a bundle for client and server. Probably doesn't handle css correctly, yet.

## Usage

In your design project:

* Install `@splish-me/ory-sites-design-webpack-configs` and its peerDependencies
* Add `webpack.config.js`:
```.js
const createConfigs = require('..');
// Depending on your project structure
const pathToEntry = './src/index.js'

module.exports = createConfigs(pathToEntry)
```
* Add build script to `package.json`:
```.json
{
  "scripts": {
    "build": "webpack"
  }
}
```
**Note**. Don't even think about minimizing the code with `--production`. If you do, ORY Sites takes even longer to parse the bundle.

* `yarn build` creates `dist/web.js` and `dist/node.js`

In your ORY Sites project

* Copy `dist/web.js` and `dist/node.js` to `custom/design/`
* Change `custom/design/index.js` to
```.js
import ExecutionEnvironment from 'exenv';

// Import your styles (these aren't handled by the webpack configs atm)
import './index.css';

let design;

if (ExecutionEnvironment.canUseDOM) {
  design = require('./web').default;
} else {
  design = require('./node').default;
}

export default design;
```

For development, you could e.g. `yarn link` your design project and require it in your ORY Sites project.
