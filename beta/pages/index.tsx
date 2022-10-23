import React from "react";
import { NextPage, GetStaticProps } from "next";
import { PostItem, PostItemProps, Layout } from "components";
import getPosts from "get-post";

const PostIndex: NextPage<Props> = ({ paths }) => {
  return (
    <Layout>
      {paths.map((path) => (
        <React.Fragment key={path.slug}>
          <PostItem {...path} />
          <hr />
        </React.Fragment>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (await getPosts()).filter((post) => post.meta.published);
  const paths: PostItemProps[] = posts.map((post) => ({
    ...post.meta,
    description: post.mdxDescription.compiledSource,
    slug: post.slug,
    date: (post.meta.date as Date).toUTCString(),
  }));

  return {
    props: {
      paths,
    },
  };
};

interface Props {
  paths: PostItemProps[];
}

export default PostIndex;
