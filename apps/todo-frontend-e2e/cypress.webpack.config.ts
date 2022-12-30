import * as path from 'path';

const tsConfigFile = path.resolve(__dirname, './tsconfig.json');

export default {
  resolve: {
    extensions: ['.ts', '.js', '.mjs'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: tsConfigFile,
          },
        },
      },
      {
        // Angular linker needed to link partial-ivy code
        // See https://angular.io/guide/creating-libraries#consuming-partial-ivy-code-outside-the-angular-cli
        test: /[/\\]@angular[/\\].+\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@angular/compiler-cli/linker/babel'],
            compact: false,
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
