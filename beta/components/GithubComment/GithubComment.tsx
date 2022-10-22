import React, { useCallback } from 'react';
import getConfig from 'next/config';

const GithubComment: React.FC = () => {
  const renderUtternce = useCallback((commentWrapperEl: HTMLDivElement) => {
    const { publicRuntimeConfig } = getConfig();
    const { utterancRepo, theme } = publicRuntimeConfig;
    const commentsTheme = theme && theme === 'dark'
            ? 'github-dark'
            : 'github-light';

    const commentScript = document.createElement('script');
    commentScript.async = true;
    commentScript.src = 'https://utteranc.es/client.js';
    commentScript.setAttribute('repo', utterancRepo);
    commentScript.setAttribute('id', 'utterances');
    commentScript.setAttribute('label', 'comment');
    commentScript.setAttribute('theme', commentsTheme);
    commentScript.setAttribute('crossorigin', 'anonymous');

    commentWrapperEl.appendChild(commentScript);
  }, []);

  return <div ref={commentWrapperEl => {
    if (!commentWrapperEl) return;
    if(commentWrapperEl.children.length) return;
    renderUtternce(commentWrapperEl);
  }}></div>
}

export default GithubComment;