import fs from "fs/promises";
import path from "path";
import { NextPage, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import fm from "front-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Meta, components, Layout } from "components";

const About: NextPage<Props> = ({ source, meta }) => {
  return (
    <Layout>
      <NextSeo title={meta.title} description={meta.description} />
      <MDXRemote {...source} components={components} />
    </Layout>
  );
};

export default About;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const mdFile = path.join(".", "contents", "about.mdx");
  const data = await fs.readFile(mdFile);
  const { attributes: meta, body } = fm<Meta>(data.toString());
  const mdxSource = await serialize(body);
  return {
    props: {
      source: mdxSource,
      meta,
    },
  };
};

interface Props {
  source: Awaited<ReturnType<typeof serialize>>;
  meta: Meta;
}
