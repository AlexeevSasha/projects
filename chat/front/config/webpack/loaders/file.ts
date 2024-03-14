export const fileLoader = [
  {
    test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
    type: "javascript/auto",
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/fonts/",
        },
      },
    ],
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    type: "javascript/auto",
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/image",
        },
      },
    ],
  },
];
