import React, { useCallback } from "react";
import { NextPage, GetStaticProps } from "next";
import getConfig from "next/config";
import {
  PostItem,
  PostItemProps,
  Pagination,
  PaginationProps,
  Layout,
} from "components";
import { getPosts, getPaginations } from "tools/post-tool";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {Adsense} from '@ctrl/react-adsense';

const Homepage: NextPage<Props> = ({ paths, pagination }) => {
  const nextGenerator = useCallback<PaginationProps["nextGenerator"]>(
    (current) => {
      return `/page/${current + 1}`;
    },
    []
  );

  const prevGenerator = useCallback<PaginationProps["prevGenerator"]>(
    (current) => {
      return `/page/${current - 1}`;
    },
    []
  );

  return (
    <Layout>
      {paths.map((path) => (
        <React.Fragment key={path.slug}>
          <PostItem {...path} />
          <hr />
        </React.Fragment>
      ))}
      <Pagination
        pagination={pagination}
        prevGenerator={prevGenerator}
        nextGenerator={nextGenerator}
      />
      <Adsense
        client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE!}
        slot="6466279268"
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => {
  const {
    publicRuntimeConfig: { pagination: paginationConfig },
  } = getConfig();
  const pageId = 1;
  const allPosts = await getPosts();
  const pagePosts = locale === "en" ? allPosts.en : allPosts.vi;
  const pages = getPaginations(pagePosts, paginationConfig.perPage);
  if (pages.length == 0) {
    return {
      props: {
        paths: [],
        pagination: {hasNext: false, hasPrevious: false, current: 0},
        ...(await serverSideTranslations(locale || 'vi')),
      }
    }
  }
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
      ...(await serverSideTranslations(locale || 'vi')),
    },
  };
};

interface Props {
  paths: PostItemProps[];
  pagination: PaginationProps["pagination"];
}

export default Homepage;
