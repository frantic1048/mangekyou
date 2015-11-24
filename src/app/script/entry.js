// emulate a full ES6 environment
// http://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import app from './app';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// render on dov#app
ReactDOM.render(React.createElement(app), document.getElementById('app'));
