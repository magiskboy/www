import { NextPage, GetStaticProps } from 'next';
import fs from 'fs/promises';
import path from 'path';
import fm from 'front-matter';
import { Meta } from 'components/Post';

const PostIndex: NextPage<Props> = ({ paths }) => {
  console.log({ paths });
  return <>{paths.map(path => <a key={path.slug} href={`/posts/${path.slug}`}>{path.title}</a>)}</>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths: PathInfo[] = [];

  const filenames = await fs.readdir(path.join('.', 'contents'));
  for (const filename of filenames) {
    const data = await fs.readFile(path.join('.', 'contents', filename));
    const { attributes: meta } = await fm<Meta>(data.toString());
    paths.push({
      title: meta.title,
      slug: filename.replace(/\.mdx?$/, ''),
    });
  }

  return {
    props: {
      paths
    }
  }
}

interface PathInfo {
  title: string;
  slug: string;
}

interface Props {
  paths: PathInfo[];
}

export default PostIndex;
