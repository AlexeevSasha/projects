import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkToc from 'remark-toc';
import remarkSlug from 'remark-slug';

export const OneMd: FC<{ file: string; name: string }> = ({ file, name }) => {
  const [mdFile, setMdFile] = useState("");

  useEffect(() => {
    fetch(file)
      .then(async (res) => res.text())
      .then((text) => {
          window.location.replace("#");
          setMdFile(text);
       });
  }, [file]);

  return (
    <Wrapper>
      <ReactMarkdown
        children={mdFile}
        remarkPlugins={[remarkGfm, remarkToc, remarkSlug]}
        rehypePlugins={[rehypeRaw]}
        transformImageUri={(uri: string) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
           return uri.match(/^images\//g) ? require(`../../../assets/docs/${uri}`).default : uri;
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  padding: 20px;
  box-shadow: 0 3px 8px 0 rgba(34, 60, 80, 0.2);
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  
  img {
    display: block;
    max-width: 1700px;
    width: 100%;
    box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  }

  h1 {
    font-size: 2em;
  }
  
  .md-img {
    max-width: 500px;
  }
`;
