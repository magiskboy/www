import React, { useCallback } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPathsResult } from "next";
import getConfig from "next/config";
import { useRouter } from 'next/router';
import { getCollection, Collection } from "post-tool";
import { Layout, Pagination, PaginationProps, PostItem } from "components";

const Category: NextPage<Collection> = ({ label, paginations, slug }) => {
  const router = useRouter();
  const page = parseInt(router.query.page as (string | undefined) || "1");
  const pagination = paginations[page - 1];

  const nextGenerator = useCallback<PaginationProps['nextGenerator']>((current) => {
    return `/categories/${slug}?page=${current + 1}`;
  }, [slug]);

  const prevGenerator = useCallback<PaginationProps['prevGenerator']>((current) => {
    return `/categories/${slug}?page=${current - 1}`;
  }, [slug]);

  return (
    <Layout>
      <h1>{label}</h1>
      {pagination.posts.map(post => <React.Fragment key={post.slug}>
        <PostItem title={post.meta.title} date={post.meta.date} slug={post.slug} description={post.mdxDescription.compiledSource} tags={post.meta.tags} />
        <hr />
      </React.Fragment>)}
      <Pagination pagination={pagination.pagination} nextGenerator={nextGenerator} prevGenerator={prevGenerator} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Collection> = async (context) => {
  const {
    publicRuntimeConfig: {
      pagination: { perPage },
    },
  } = getConfig();
  const categorySlug = context.params?.slug || "";
  const collection = (await getCollection("categories", perPage)).find(
    (collection) => collection.slug === categorySlug
  );
  if (!collection) throw new Error(`Category ${categorySlug} not found`);
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
  const collections = await getCollection('categories', perPage);
  const paths = collections.reduce<StaticPathType>((prev, curr) => {
    const collectionPaths: StaticPathType = curr.paginations.map(pagination => ({
      params: {
        slug: curr.slug,
        page: pagination.pagination.current.toString(),
      }
    }));
    return [...prev, ...collectionPaths];
  }, []);
  return {
    paths,
    fallback: false,
  };
};

type StaticPathType = GetStaticPathsResult['paths'];

export default Category;
