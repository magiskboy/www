import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import getConfig from "next/config";
import { getCollection, Collection } from "post-tool";
import { Layout, Pagination } from "components";

const Category: NextPage<Collection> = ({ label, paginations }) => {
  return (
    <Layout>
      <h1>{label}</h1>
      <Pagination prefix="/categories" pagination={paginations[0].pagination} />
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
  const paths = (await getCollection("categories", perPage)).map(
    (collection) => ({
      params: {
        slug: collection.slug,
      },
    })
  );
  return {
    paths,
    fallback: false,
  };
};

export default Category;
