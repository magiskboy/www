import React from "react";
import { NextSeo } from "next-seo";
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
            value={meta.date}
            style={{
              color: "gray",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          />
          <p>{meta.description}</p>
        </div>
        <div className={style.content}>{children}</div>
      </div>
    </>
  );
};

export default Post;

interface PostProps {
  children: React.ReactNode;
  meta: Meta & Record<string, any>;
}

export interface Meta {
  title: string;
  description: string;
  date: Date;
}
