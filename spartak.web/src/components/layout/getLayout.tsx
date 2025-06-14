import { PageProps } from "../../../pages/_app";
import { Layout } from "./layout";

export const GetLayout = (page: JSX.Element, { metaTags }: PageProps) => <Layout metaTags={metaTags}>{page}</Layout>;
