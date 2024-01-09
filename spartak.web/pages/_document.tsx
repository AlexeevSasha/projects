import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {process.env.NEXT_PUBLIC_DOMAIN === "prod" ? (
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-MGMSVK6"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          ) : null}
          <Main />
          <NextScript />
          {process.env.NEXT_PUBLIC_BUILD === "prod" ? (
            <>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(91891034, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`,
                }}
              ></script>
              <noscript>
                <div>
                  <img
                    src="https://mc.yandex.ru/watch/91891034"
                    style={{ position: "absolute", left: "-9999px" }}
                    alt=""
                  />
                </div>
              </noscript>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
                  (function(w, d, s, h, id) {
                    w.roistatProjectId = id; w.roistatHost = h;
                    var p = d.location.protocol == "https:" ? "https://" : "http://";
                    var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);
                    var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
                  })(window, document, 'script', 'cloud.roistat.com', '11b10bfa5b226d804556c1af3c47d955');`,
                }}
              ></script>
            </>
          ) : null}
        </body>
      </Html>
    );
  }
}
