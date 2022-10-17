import { NextPage, GetStaticProps } from "next";
import { Meta } from "components/Post";
import fs from "fs";
import path from "path";

const Index: NextPage<Props> = ({ pages }) => {
  console.log({ pages });
  return null;
};

interface Props {
  pages: Record<string, Meta>;
}

export default Index;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const pages: Record<string, Meta> = {};
  const postDir = path.join(process.cwd(), "pages", "posts");
  for (const filename of fs.readdirSync(postDir)) {
    const fullPath = path.join(postDir, filename);
    const { meta } = await import(fullPath);
    pages[filename] = meta;
  }

  return {
    props: {
      pages,
    },
  };
};
