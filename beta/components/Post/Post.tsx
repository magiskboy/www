import React from "react";
import { useRouter } from 'next/router';
import { NextSeo } from "next-seo";
import { MDXRemote } from 'next-mdx-remote';
import DateTime from "components/DateTime";
import style from "./Post.module.scss";
import { serialize } from "next-mdx-remote/serialize";

const Post: React.FC<PostProps> = ({ children, meta, mdxDescription }) => {
  const router = useRouter();
  const { asPath } = router;
  return (
    <>
      <NextSeo title={meta.title} description={meta.description} canonical={`https://nkthanh.dev${asPath}`} />

      <div className={style.root}>
        <div className={style.heading}>
          <h1>{meta.title}</h1>
          <DateTime
            value={typeof meta.date === 'string' ? new Date(meta.date) : meta.date}
            style={{
              color: "gray",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          />
          <MDXRemote {...mdxDescription} />
        </div>
        <div className={style.content}>{children}</div>
      </div>
    </>
  );
};

export default Post;

interface PostProps {
  children: React.ReactNode;
  meta: Meta;
  mdxDescription: Awaited<ReturnType<typeof serialize>>;
}

export interface Meta {
  title: string;
  date: string | Date;
  tags?: string[];
  categories?: string[];
  description?: string;
  published?: boolean;
}
