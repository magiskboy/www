import React, { useCallback } from 'react';
import getConfig from 'next/config';

const GithubComment: React.FC = () => {
  const renderUtternce = useCallback((commentRef: HTMLDListElement) => {
    const { publicRuntimeConfig } = getConfig();
    const { utterancRepo, theme } = publicRuntimeConfig;
    const commentsTheme = theme && theme === 'dark'
            ? 'github-dark'
            : 'github-light';

    const commentScript = document.createElement('script');
    commentScript.async = true;
    commentScript.src = 'https://utteranc.es/client.js';
    commentScript.setAttribute('repo', utterancRepo);
    commentScript.setAttribute('issue-term', 'pathname');
    commentScript.setAttribute('id', 'utterances');
    commentScript.setAttribute('label', 'comment');
    commentScript.setAttribute('theme', commentsTheme);
    commentScript.setAttribute('crossorigin', 'anonymous');

    commentRef.appendChild(commentScript);
  }, []);

  return <div ref={commentRef => {
    if (!commentRef) return;
    renderUtternce(commentRef);
  }}></div>
}

export default GithubComment;