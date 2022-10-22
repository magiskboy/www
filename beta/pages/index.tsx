import fs from "fs/promises";
import path from "path";
import React from "react";
import { NextPage, GetStaticProps } from "next";
import fm from "front-matter";
import { serialize } from "next-mdx-remote/serialize";
import { Meta } from "components/Post";
import PostItem, { PostItemProps } from "components/PostItem";
import { getSlugByMdx } from "helper";
import { POST_DIR } from "contants";

const PostIndex: NextPage<Props> = ({ paths }) => {
  return (
    <div
      style={{
        width: "var(--main-width)",
        margin: "3rem auto",
        padding: "0 var(--main-padding)",
      }}
    >
      {paths.map((path) => (
        <React.Fragment key={path.slug}>
          <PostItem {...path} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const paths: PostItemProps[] = [];

  const filenames = await fs.readdir(POST_DIR);
  for (const filename of filenames) {
    const data = await fs.readFile(path.join(POST_DIR, filename));
    const { attributes: meta } = fm<Meta>(data.toString());
    if (!meta.published) continue;
    const description = await serialize(meta.description || "");
    paths.push({
      ...meta,
      description: description.compiledSource,
      slug: getSlugByMdx(filename),
    });
  }

  return {
    props: {
      paths: paths
        .sort((a, b) => {
          const t1 = (a.date as Date).getTime();
          const t2 = (b.date as Date).getTime();
          if (t1 < t2) return 1;
          if (t1 > t2) return -1;
          return 0;
        })
        .map((path) => ({ ...path, date: (path.date as Date).toUTCString() })),
    },
  };
};

interface Props {
  paths: PostItemProps[];
}

export default PostIndex;
