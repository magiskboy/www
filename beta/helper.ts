export function getSlugByMdx(filename: string): string {
  return filename.replace(/\.mdx?$/, '');
}

export function genPostLink(slug: string): string {
  return `/posts/${encodeURIComponent(slug)}`;
}

export function genTagLink(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}`;
}
