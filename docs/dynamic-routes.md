# Dynamic Routes

[官方 Dynamic Routes 介绍](https://nextjs.org/docs/routing/dynamic-routes)

## Page Path Depends on External Data

`Next.js` 允许 Static Generation 具有依赖于外部数据的路径的 Page。这会在 `Next.js` 中启用 `dynamic URLs`。

大概步骤如下：

1. 在 pages 目录下的期望位置创建一个 `[id].jsx` 的文件，其中 `id` 可以任意更改
2. 然后该文件中有一个 React Component 渲染这个页面的内容
3. 导出一个异步函数 [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)，它将返回 `id` 所有可能的值列表
4. 导出一个异步函数 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)，它将根据 `id` 获取 React Component 所需要的数据

大概如下：
```jsx
import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../utils/posts.utils';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
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
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
}
```

## Fetch External API or Query Database

与 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) 一样， [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) 可以从任何数据源获取数据。在示例中， getAllPostIds （由 [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) 使用）可以从外部 API 端点获取，如下：

```js
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

## Development vs. Production

- 在开发中（yarn dev），[getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) 在每个请求（every request）上运行。
- 在生产环境中， [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) 在构建时（build time）运行。

## Fallback

示例代码中的 getStaticPaths 返回了 `fallback: false`。

如果 `fallback` 是 `false` ，则 `getStaticPaths` 未返回的任何路径都将导致渲染为 404 页面。

如果 `fallback` 是 `true` ，那么 `getStaticProps` 的行为会改变：
 - 从 `getStaticPaths` 返回的路径将在构建时呈现为 HTML。
 - 构建时未生成的路径不会产生 404 页面。相反，Next.js 将在第一次请求此类路径时提供页面的 “fallback” 版本。
 - 在后台，`Next.js` 会静态生成请求的路径。对同一路径的后续请求将为生成的页面提供服务，就像在构建时预呈现的其他页面一样。

 如果 `fallback` 是 `blocking` ，那么新路径将在服务器端使用 `getStaticProps` 渲染，并缓存以供将来请求使用，因此每个路径只发生一次。

 更详细的解释请参阅文档：[https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false)

 ## Catch-all Routes

 要想捕获所有的路径，通过在括号内添加三个点 ( `...` )，可以扩展动态路由以捕获所有路径。例如：
 - `pages/posts/[...id].jsx` 匹配 `/posts/a` ，但也匹配 `/posts/a/b`、`/posts/a/b/c` 等等。

 如果这样做，在 `getStaticPaths` 中，必须返回一个数组作为 `id` 键的值，如下所示：

 ```js
 return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c'],
    },
  },
  //...
];
```

查看 [catch all routes 文档](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes) 以了解更多信息。

## Router

如果想访问 `Next.js Router`，可以通过从 [next/router](https://nextjs.org/docs/api-reference/next/router) 导入 [useRouter](https://nextjs.org/docs/api-reference/next/router#userouter) hook 来实现。

## 404 Pages

要创建自定义 404 页面，需要创建 `pages/404.jsx`。该文件是在构建时静态生成的，如下：

```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

查看 [Error Pages 文档](https://nextjs.org/docs/advanced-features/custom-error-page) 以了解更多信息。

## More Examples

这里有[几个示例](https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details)来说明 `getStaticProps` 和 `getStaticPaths` — 查看它们的源代码以了解更多信息