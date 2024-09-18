const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const babelLoader = {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/react-icons'),
        ],
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
          ],
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      };

      webpackConfig.module.rules.push(babelLoader);

      return webpackConfig;
    },
  },
};