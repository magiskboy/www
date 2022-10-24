import getPosts, { Post } from 'get-post';
import { PaginationProps } from 'components/Pagination';

async function getPaginations(perPage = 5): Promise<Pagination[]> {
  const posts = await getPosts();
  const paginations: Pagination[] = [];
  for (let i = 0; i < posts.length; i += perPage) {
    paginations.push({
      posts: posts.slice(i, i + perPage),
      pagination: {
        hasNext: true,
        hasPrevious: true,
        current: Math.floor(i / perPage) + 1,
      }
    })
  };

  if (paginations.length > 0) {
    paginations[0].pagination.hasPrevious = false;
    paginations[paginations.length - 1].pagination.hasNext = false;
  }
  return paginations;
}

export default getPaginations;

interface Pagination {
  posts: Post[];
  pagination: PaginationProps['pagination'];
}
