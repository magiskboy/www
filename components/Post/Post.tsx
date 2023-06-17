import React from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { MDXRemote } from "next-mdx-remote";
import style from "./Post.module.scss";
import { serialize } from "next-mdx-remote/serialize";
import { DateTime } from "../DateTime";

export const Post: React.FC<PostProps> = ({
  children,
  meta,
  mdxDescription,
}) => {
  const router = useRouter();
  return (
    <>
      <NextSeo title={meta.title} description={meta.description} />

      <div className={style.root}>
        <div className={style.heading}>
          <h1 style={{ textAlign: "left" }}>{meta.title}</h1>
          <DateTime
            value={
              typeof meta.date === "string" ? new Date(meta.date) : meta.date
            }
            locale={router.locale}
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
  score?: number;
}
