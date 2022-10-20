import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Category: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  return <h1>Category {name?.toString()}</h1>
}

export default Category;
