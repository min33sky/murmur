import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useRecoilValue } from 'recoil';
import { postsListState } from '../store/posts';
import PostForm from '../components/Post/PostForm';
import PostCard from '../components/Post/PostCard';

const Home: NextPage = () => {
  const postsList = useRecoilValue(postsListState);

  return (
    <Layout>
      <Head>
        <title>Murmur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold text-indigo-600">Hello World</h1>

      <PostForm />

      <div className="mt-4">
        {postsList.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
