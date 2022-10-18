import classnames from 'classnames';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { genTagLink, genPostLink } from 'helper';
import type { Meta } from 'components/Post';
import DateTime from 'components/DateTime';
import style from './PostItem.module.scss';

const PostItem: React.FC<PostItemProps> = ({ title, slug, date, description, tags }) => {
  return <div className={classnames({
    'post-item': true,
    [style.root]: true
  })}>
    <Link href={genPostLink(slug)}>
      <a><h2 className={style.title}>{title}</h2></a>
    </Link>
    <DateTime className={style.date} value={typeof date === 'string' ? new Date(date) : date} />
    {description && <div className={style.description}>
      <MDXRemote compiledSource={description} />
    </div>}
    <ul className={style.tags}>
      {tags?.map(tag => <Link key={tag} href={genTagLink(tag)} className="tag"><a><span className={`tag ${style.tag}`}>{tag}</span></a></Link>)}
    </ul>
  </div>
}

export default PostItem;

export type PostItemProps = Meta & { slug: string };
