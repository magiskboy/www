import classnames from "classnames";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import type { Meta } from "../Post";
import { DateTime } from "../DateTime";
import style from "./PostItem.module.scss";
import { useRouter } from 'next/router';
import slugify from "slugify";

export const PostItem: React.FC<PostItemProps> = ({
  title,
  slug,
  date,
  description,
  tags,
}) => {
  const router = useRouter();
  return (
    <div
      className={classnames({
        "post-item": true,
        [style.root]: true,
      })}
    >
      <Link href={genPostLink(slug)}>
        <h2 className={style.title}>{title}</h2>
      </Link>
      <DateTime
        className={style.date}
        value={typeof date === "string" ? new Date(date) : date}
        locale={router.locale}
      />
      {description && (
        <div className={style.description}>
          <MDXRemote compiledSource={description} scope={""} frontmatter={{}} />
        </div>
      )}
      <ul className={style.tags}>
        {tags?.map((tag) => (
          <li key={tag} className={style.tag}>
            <Link href={genTagLink(tag)}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export type PostItemProps = Meta & { slug: string };

function genPostLink(slug: string): string {
  return `/posts/${encodeURIComponent(slug)}`;
}

function genTagLink(tag: string): string {
  return `/tags/${slugify(tag)}`;
}
