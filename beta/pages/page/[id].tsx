import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import getConfig from 'next/config';
import {
  PostItem,
  PostItemProps,
  Pagination,
  PaginationProps,
  Layout,
} from "components";
import getPaginations from 'get-pagination';

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

export const getStaticPaths: GetStaticPaths = async () => {
  const { publicRuntimeConfig: { pagination: paginationConfig } } = getConfig();
  const paginations = await getPaginations(paginationConfig.perPage);
  const paths = [];
  for (let i = 1; i <= paginations.length; ++i) {
    paths.push({
      params: { id: i.toString() }
    });
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { publicRuntimeConfig: { pagination: paginationConfig } } = getConfig();
  const pageId = parseInt(context.params!.id as string);
  const pages = await getPaginations(paginationConfig.perPage);
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

export default Page;
