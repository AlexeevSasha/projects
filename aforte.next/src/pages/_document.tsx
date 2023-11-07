import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { myFont } from "./_app";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head />
        <body className={myFont.className}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
