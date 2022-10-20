import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import style from './GithubComment.module.scss';

const GithubComment: React.FC<Props> = ({ repo, file }) => {
  const [totalComments, setTotalComments] = useState(0);
  const [user, setUser] = useState<User>();
  const [comment, setComment] = useState('');

  const onSubmitComment = useCallback(() => {
    console.log('comment with', user);
  }, [repo, file, user]);

  const onChangComment = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    setComment(event.target.value);
  }, []);

  useEffect(() => {
    // fetching user info
    setUser({ profile: 'https://avatars.githubusercontent.com/u/13352088?v=4?v=3', name: 'Nguyen Khac Thanh', accessToken: '' })
  }, []);

  return <div className={style.root}>
    <span className={style.totalComment}>{totalComments} Comments</span>
    <div className={style.main}>
      <div className={style.side}>
        {user && <Image src={user.profile} width={64} height={64} alt={user.name} loader={({ src, width }) => {
          return `${src}&s=${width}`;
        }} />}
      </div>
      <textarea placeholder="Leave a comment" className={style.comment} rows={4} onChange={onChangComment}></textarea>
      <button className={classnames({
        [style.commentBtn]: true,
        [style.commentBtnDisable]: comment.length === 0,
        [style.commentBtnActive]: comment.length > 0,
      })} onClick={onSubmitComment}>Comment</button>
    </div>
  </div>
}

export default GithubComment;

interface Props {
  repo: string;
  file: string;
}

interface User {
  profile: string;
  name: string;
  accessToken: string;
}

