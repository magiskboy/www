import React, { useCallback } from "react";
import getConfig from "next/config";
import { useTheme } from 'next-themes';

const theme2commentTheme: Record<string, string> = {
  "light": "github-light",
  "dark": "github-dark",
  "papyrus": "gruvbox-dark",
  "system": "github-light",
}

export const Comment: React.FC = () => {
  const { theme } = useTheme();

  const renderUtternce = useCallback((commentWrapperEl: HTMLDivElement) => {
    const { publicRuntimeConfig } = getConfig();
    const { utterancRepo } = publicRuntimeConfig;
    const commentsTheme = theme2commentTheme[theme || 'system'];

    const commentScript = document.createElement("script");
    commentScript.async = true;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("repo", utterancRepo);
    commentScript.setAttribute("issue-term", "pathname");
    commentScript.setAttribute("id", "utterances");
    commentScript.setAttribute("label", "comment");
    commentScript.setAttribute("theme", commentsTheme);
    commentScript.setAttribute("crossorigin", "anonymous");

    commentWrapperEl.appendChild(commentScript);
  }, [theme]);

  return (
    <div
      ref={(commentWrapperEl) => {
        if (!commentWrapperEl) return;

        if (commentWrapperEl.childElementCount > 0) {
          return;
        }
        renderUtternce(commentWrapperEl);
      }}
    ></div>
  );
};
