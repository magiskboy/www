import classnames from "classnames";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import type { Meta } from "../Post";
import { DateTime } from "../DateTime";
import style from "./PostItem.module.scss";

export const PostItem: React.FC<PostItemProps> = ({
  title,
  slug,
  date,
  description,
  tags,
}) => {
  return (
    <div
      className={classnames({
        "post-item": true,
        [style.root]: true,
      })}
    >
      <Link href={genPostLink(slug)}>
        <a>
          <h2 className={style.title}>{title}</h2>
        </a>
      </Link>
      <DateTime
        className={style.date}
        value={typeof date === "string" ? new Date(date) : date}
      />
      {description && (
        <div className={style.description}>
          <MDXRemote compiledSource={description} />
        </div>
      )}
      <ul className={style.tags}>
        <li>
          {tags?.map((tag) => (
            <Link key={tag} href={genTagLink(tag)} className="tag">
              <a>
                <span className={`tag ${style.tag}`}>{tag}</span>
              </a>
            </Link>
          ))}
        </li>
      </ul>
    </div>
  );
};

export type PostItemProps = Meta & { slug: string };

function genPostLink(slug: string): string {
  return `/posts/${encodeURIComponent(slug)}`;
}

function genTagLink(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}`;
}
