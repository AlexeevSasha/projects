import Head from "next/head";

export type MetaTagsT = {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  titleOg?: string;
  imageOg?: string;
  typeOg?: string;
  descriptionOg?: string;
  h1?: string;
};

interface IProps {
  metaTags?: MetaTagsT | null;
}

export const BaseMeta = ({ metaTags }: IProps) => {
  return (
    <>
      <Head>
        {/* Теги для поисковиков */}
        <title>{metaTags?.title}</title>
        <meta name="description" content={metaTags?.description} />
        <meta name="keywords" content={metaTags?.keywords} />
        <meta name="author" content={metaTags?.author} />
        {/* Теги для отображения ссылок в соц сетях */}
        <meta property="og:title" content={metaTags?.titleOg} key="title" />
        <meta property="og:image" content={metaTags?.imageOg} key="image" />
        <meta property="og:type" content={metaTags?.typeOg} key="type" />
        <meta property="og:description" content={metaTags?.descriptionOg} key="description" />
      </Head>
    </>
  );
};
