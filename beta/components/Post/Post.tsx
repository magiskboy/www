import React from "react";
import { NextSeo } from "next-seo";
import { MDXRemote } from 'next-mdx-remote';
import DateTime from "components/DateTime";
import style from "./Post.module.scss";

const Post: React.FC<PostProps> = ({ children, meta }) => {
  return (
    <>
      <NextSeo title={meta.title} description={meta.description} />

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
          <MDXRemote compiledSource={meta.description!} />
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
}

export interface Meta {
  title: string;
  date: string | Date;
  tags?: string[];
  categories?: string[];
  description?: string;
}
