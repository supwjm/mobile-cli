require('babel-core/register')({
  presets: ['env', 'react'],
  plugins: ['react-loadable/babel','syntax-dynamic-import','dynamic-import-node']
});
require('./ignore')();
require('./server');
