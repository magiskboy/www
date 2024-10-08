import React, { useCallback } from "react";
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPathsResult,
} from "next";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { getCollection, Collection } from "tools/post-tool";
import { Layout, Pagination, PaginationProps, PostItem } from "components";

const Tag: NextPage<Collection> = ({ label, paginations, slug }) => {
  const router = useRouter();
  const page = parseInt((router.query.page as string | undefined) || "1");
  const pagination = paginations[page - 1];

  const nextGenerator = useCallback<PaginationProps["nextGenerator"]>(
    (current) => {
      return `/tags/${slug}?page=${current + 1}`;
    },
    [slug]
  );

  const prevGenerator = useCallback<PaginationProps["prevGenerator"]>(
    (current) => {
      return `/tags/${slug}?page=${current - 1}`;
    },
    [slug]
  );

  return (
    <Layout>
      <h1>Tag: {label}</h1>
      {pagination.posts.map((post) => (
        <React.Fragment key={post.slug}>
          <PostItem
            title={post.meta.title}
            date={post.meta.date}
            slug={post.slug}
            description={post.mdxDescription.compiledSource}
          />
          <hr />
        </React.Fragment>
      ))}
      <Pagination
        pagination={pagination.pagination}
        nextGenerator={nextGenerator}
        prevGenerator={prevGenerator}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Collection> = async (context) => {
  const {
    publicRuntimeConfig: {
      pagination: { perPage },
    },
  } = getConfig();
  const tag = context.params?.tag || "";
  const collection = (await getCollection("tags", perPage)).find(
    (collection) => collection.slug === tag
  );
  if (!collection) throw new Error(`Category ${tag} not found`);
  return {
    props: {
      ...collection,
      paginations: collection.paginations.map((pagination) => ({
        ...pagination,
        posts: pagination.posts.map((post) => ({
          ...post,
          meta: { ...post.meta, date: (post.meta.date as Date).toUTCString() },
        })),
      })),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    publicRuntimeConfig: {
      pagination: { perPage },
    },
  } = getConfig();
  const collections = await getCollection("tags", perPage);
  const paths = collections.reduce<StaticPathType>((prev, curr) => {
    const collectionPaths: StaticPathType = curr.paginations.map(
      (pagination) => ({
        params: {
          tag: curr.slug,
          page: pagination.pagination.current.toString(),
        },
      })
    );
    return [...prev, ...collectionPaths];
  }, []);
  return {
    paths,
    fallback: false,
  };
};

type StaticPathType = GetStaticPathsResult["paths"];

export default Tag;
