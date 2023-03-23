# Dynamic Routes

[官方 Dynamic Routes 介绍](https://nextjs.org/docs/routing/dynamic-routes)

## Page Path Depends on External Data

`Next.js` 允许 Static Generation 具有依赖于外部数据的路径的 Page。这会在 `Next.js` 中启用 `dynamic URLs`。

大概步骤如下：

1. 在 pages 目录下的期望位置创建一个 `[id].jsx` 的文件，其中 `id` 可以任意更改
2. 然后该文件中有一个 React Component 渲染这个页面的内容
3. 导出一个异步函数 [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)，它将返回 `id` 所有可能的值列表
4. 导出一个异步函数 [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)，它将根据 `id` 获取 React Component 所需要的数据
