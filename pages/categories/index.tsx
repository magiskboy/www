import { NextPage, GetStaticProps } from "next";
import getConfig from "next/config";
import Link from "next/link";
import { Layout } from "components";
import { getCollection } from "tools/post-tool";
import React from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CategoryIndex: NextPage<Props> = ({ paths }) => {
  return (
    <Layout>
      {paths.map((path) => (
        <React.Fragment key={path.slug}>
          <Link href={`/categories/${path.slug}`}>{path.label}</Link>
          <hr />
        </React.Fragment>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => {
  const {
    publicRuntimeConfig: {
      pagination: { perPage },
    },
  } = getConfig();
  const collections = await getCollection("categories", perPage);
  return {
    props: {
      paths: collections.map((collection) => ({
        label: collection.label,
        slug: collection.slug,
      })),
      ...(await serverSideTranslations(locale || 'vi'))
    },
  };
};

interface Props {
  paths: {
    label: string;
    slug: string;
  }[];
}

export default CategoryIndex;
