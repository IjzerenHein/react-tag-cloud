var path = require('path');
module.exports = {
  entry: './src/TagCloud.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'TagCloud.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|build)/,
      }
    ]
  },
  externals: {
    'react': 'commonjs react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    'react-measure': 'react-measure',
    'd3-cloud': 'd3-cloud',
    'prop-types': 'prop-types'
  }
};