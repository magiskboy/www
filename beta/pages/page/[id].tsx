import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import {
  PostItem,
  PostItemProps,
  Pagination,
  PaginationProps,
  Layout,
} from "components";
import getPosts from "get-post";

const Page: NextPage<Props> = ({ paths, pagination }) => {
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
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
      pagination: {
        hasNext: true,
        hasPrevious: true,
        current: 2,
      },
    },
  };
};

interface Props {
  paths: PostItemProps[];
  pagination: PaginationProps["pagination"];
}

export default Page;
