import Head from "next/head";
import { useRouter } from "next/router";
import { LocaleType } from "../../api/dto/LocaleType";
import { getLocalValue } from "../../assets/helpers/getLocalValue";

export interface IMetaTags {
  titleName?: LocaleType;
  titleOg?: LocaleType;
  imageOg?: LocaleType;
  typeOg?: LocaleType;
  descriptionOg?: LocaleType;
  localeOg?: LocaleType;
  h1?: LocaleType;
}

interface IProps {
  metaTags?: IMetaTags | null;
}

export const BaseMeta = ({ metaTags }: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-MGMSVK6');`,
          }}
        ></script>

        <meta name="apple-itunes-app" content="app-id=1638687708" />
        {/* <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
        /> */}
        <title>{getLocalValue(metaTags?.titleName, locale)}</title>
        <meta property="og:title" content={getLocalValue(metaTags?.titleOg, locale)} key="title" />
        <meta property="og:image" content={getLocalValue(metaTags?.imageOg, locale)} key="image" />
        <meta property="og:type" content={getLocalValue(metaTags?.typeOg, locale)} key="type" />
        <meta property="og:description" content={getLocalValue(metaTags?.descriptionOg, locale)} key="description" />
        <meta property="og:locale" content={getLocalValue(metaTags?.localeOg, locale)} key="locale" />
      </Head>
    </>
  );
};
