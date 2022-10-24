import React from "react";
import { NextPage, GetStaticProps } from "next";
import getConfig from "next/config";
import {
  PostItem,
  PostItemProps,
  Pagination,
  PaginationProps,
  Layout,
} from "components";
import { getPosts, getPaginations } from "post-tool";

const Homepage: NextPage<Props> = ({ paths, pagination }) => {
  return (
    <Layout>
      {paths.map((path) => (
        <React.Fragment key={path.slug}>
          <PostItem {...path} />
          <hr />
        </React.Fragment>
      ))}
      <Pagination pagination={pagination} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const {
    publicRuntimeConfig: { pagination: paginationConfig },
  } = getConfig();
  const pageId = 1;
  const allPosts = await getPosts();
  const pages = await getPaginations(allPosts, paginationConfig.perPage);
  const { posts, pagination } = pages[pageId - 1];
  const paths: PostItemProps[] = posts.map((post) => ({
    ...post.meta,
    description: post.mdxDescription.compiledSource,
    slug: post.slug,
    date: (post.meta.date as Date).toUTCString(),
  }));

  return {
    props: {
      paths,
      pagination,
    },
  };
};

interface Props {
  paths: PostItemProps[];
  pagination: PaginationProps["pagination"];
}

export default Homepage;
