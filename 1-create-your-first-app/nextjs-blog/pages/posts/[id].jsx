import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../utils/posts.utils';

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

// Dynamic Routes
export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    // paths 包含由 getAllPostIds() 返回的已知路径数组，其中包括由 pages/posts/[id].js 定义的参数
    paths,
    fallback: false,
  };
}

// Component Props
export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = getPostData(params.id);
  return {
    props: { postData },
  };
}
