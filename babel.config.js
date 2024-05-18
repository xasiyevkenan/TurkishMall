module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
        ],
        alias: {
          assets: './src/assets',
          components: './src/components',
          router: './src/router',
          screens: './src/screens',
        },
      },
    ],
  ],
};
