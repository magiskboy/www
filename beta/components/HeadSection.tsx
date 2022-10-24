import Head from "next/head";

export const MetaSection: React.FC<{ meta: MetaProps }> = ({ meta }) => (
  <Head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:type" content="article" />
    <meta
      property="og:url"
      content="https://nkthanh.dev/posts/tree-shaking-cho-ung-dung-web/"
    />
    <meta property="article:section" content="posts" />
    <meta property="article:published_time" content={meta.date.toString()} />
    <meta property="article:modified_time" content={meta.date.toString()} />
    <meta property="og:site_name" content="Nguyễn Khắc Thành" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
  </Head>
);

interface MetaProps {
  title: string;
  description: string;
  date: Date;
}
