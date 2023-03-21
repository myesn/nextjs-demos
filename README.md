# Next.js 学习笔记

## 官网

[https://nextjs.org](https://nextjs.org)

## 创建项目

参考 [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)

### 最基本的创建命令

如下：
```
yarn create next-app my-project
```

### 使用模板创建项目

使用 `--example` 标志基于模板创建项目，如下：
```bash
yarn create next-app nextjs-blog --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

- `Next.js` 官方模板列表：[https://github.com/vercel/next.js/tree/canary/examples](https://github.com/vercel/next.js/tree/canary/examples)
- `Vercel` 模板列表：[https://github.com/vercel/next-learn](https://github.com/vercel/next-learn)
- 如果创建报错，参考：[https://github.com/vercel/next-learn/blob/master/basics/errors/install.md](https://github.com/vercel/next-learn/blob/master/basics/errors/install.md)

## 自定义 `<html>` 标签

如果要自定义 `<html>` 标签，例如添加 `lang` 属性，可以通过创建 `pages/_document.js` 文件来实现，参阅：[https://nextjs.org/docs/advanced-features/custom-document](https://nextjs.org/docs/advanced-features/custom-document)。

## Styling Tips

[https://nextjs.org/learn/basics/assets-metadata-css/styling-tips](https://nextjs.org/learn/basics/assets-metadata-css/styling-tips)

- Using clsx library to toggle classes
- Customizing PostCSS Config
- Using Sass
- Next.js's built-in CSS Support and CSS Modules

## Pre-rendering

默认情况下，`Next.js` 预渲染（Pre-render）每个页面。这意味着 `Next.js` 会提前为每个页面生成 `HTML`，而不是全部由客户端 `JavaScript` 完成。**预渲染可以带来更好的性能和 SEO**。

每个生成的 `HTML` 都与该页面所需的最少 `JavaScript` 代码相关联。当浏览器加载页面时，其 `JavaScript` 代码将运行并使页面完全交互。（这个过程称为 `水合作用(hydration)`）。

`Next.js` 的 [Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering) 分为 [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) 和 [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) 两种形式, `Static Generation` 又分为 [with data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) 和 [without data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data).

两种预渲染形式的区别如下：
  - 静态生成（推荐）`ssg`：`HTML` 在构建时生成，并将在每个请求中重复使用。
  - 服务器端呈现 `ssr`：`HTML` 是在每个请求上生成的。

重要的是，`Next.js` 允许选择要为每个页面使用的预渲染形式。您可以通过对大多数页面使用静态生成并为其他页面使用服务器端呈现来创建 **“混合（hybird）” Next.js 应用程序**。

出于性能原因，建议使用静态生成而不是服务器端呈现。静态生成的页面可以由 `CDN` 缓存，无需额外配置以提高性能。但是，在某些情况下，服务器端渲染可能是唯一的选择。

还可以将客户端数据提取与静态生成或服务器端渲染一起使用。这意味着页面的某些部分可以完全由客户端 `JavaScript` 渲染。要了解更多信息，请查看 [Data Fetching](https://nextjs.org/docs/basic-features/data-fetching/client-side) 文档。

### Static Generation

Static Generation 简称 `SSG`，可以在 [with data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) 和 [without data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) 的情况下完成。

`with data` 使用 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) 生成静态数据，它是如何工作的？在 Next.js 中，当导出页面组件时，还可以导出一个名为 `getStaticProps` 的 `async` 函数。如果你这样做，那么：
- getStaticProps 在生产中的构建时运行。
- 在函数内部，可以获取外部数据并将其作为 `props` 发送到 `page`。

例如：
```js
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```
注意：在开发模式（development mode）下， `getStaticProps` 改为在每个请求上运行。

当请求外部 API 时：
```js
export async function getStaticProps() {
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return { props: { data: res.json() } };
}
```
注意：Next.js polyfills [fetch()](https://nextjs.org/docs/basic-features/supported-browsers-features) 在客户端和服务器上。不需要导入（import）它。

当查询数据库时：
```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // fetch post data from a database
  const items = databaseClient.query('SELECT posts...');
  return { props: { items }};
}
```
这是允许的，因为 `getStaticProps` 仅在服务器端运行。它永远不会在客户端运行。它甚至不会包含在浏览器的 JS 包中。这意味着可以编写直接查询数据库等代码，而无需将它们发送到浏览器。

Development vs. Production：
- 在 `development` 环境中（yarn dev ），`getStaticProps` 在每个请求（every request）上运行。
- 在 `production` 环境中，`getStaticProps` 在构建时（build time）运行。但是，可以使用 [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) 返回的 [fallback 字段](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false) 来增强此行为。

`getStaicProps()` 只能从 [page](https://nextjs.org/docs/basic-features/pages) 中导出，不能从 `non-page` 文件中导出它。这种限制的原因之一是 `React` 需要在页面呈现之前拥有所有必需的数据。

由于 `Static Generation` 只在构建时发生一次，因此它不适合频繁更新或根据每个用户请求更改的数据。

### Server-side Rendering

如果需要在请求时（request time）而不是在构建时（build time）获取数据，可以尝试服务器端渲染（Server-side Rendering），简称 `SSR`。

要使用 [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) ，需要从 `page` 导出 [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) 而不是 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)，如下：
```js
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

因为 `getServerSideProps` 在请求时（request time）被调用，所以它的参数 (`context`) 包含请求特定的参数。

仅当需要预呈现其数据必须在请求时获取的页面时，才应使用 `getServerSideProps` 。第一个字节的时间 ([TTFB](https://web.dev/time-to-first-byte/)) 将比 `getStaticProps` 慢，因为服务器必须计算每个请求的结果，并且如果没有额外配置，[CDN](https://vercel.com/docs/edge-network/overview) 无法缓存结果。

### Client-side rendering

如果不需要预渲染数据，也可以使用以下策略（称为 [Client-side Rendering](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)）：
- 静态生成（预渲染）不需要外部数据的页面部分
- 当页面加载时，使用 `JavaScript` 从客户端获取外部数据并填充其余部分。

例如，此方法适用于用户仪表板页面。因为仪表板是私有的、特定于用户的页面，所以与 `SEO`无关，并且页面不需要 [预渲染（pre-rendered）](https://nextjs.org/docs/basic-features/pages#pre-rendering)。数据更新频繁，需要请求时取数据。

`Next.js` 团队创建了一个名为 [SWR](https://swr.vercel.app/) 的用于数据获取的 `React hook`。如果您在客户端获取数据，强烈推荐使用。它处理缓存、重新验证、焦点跟踪、间隔重新获取等。这里不介绍细节，但简单示意一个示例用法：
```js
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

## 其他

### Markdown Metadata

`Markdown` 文件顶部有一些元数据定义，其中包含 `title` 和 `date`，这被称为 `YAML Front Matter`，可以使用名为 [gray-matter](https://github.com/jonschlinkert/gray-matter) 的库对其进行解析。

```markdown
---
title: 'x'
date: '2023-03-21'
---
```
