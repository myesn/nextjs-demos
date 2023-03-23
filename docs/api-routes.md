# API Routes

[官方 API Routes 文档](https://nextjs.org/docs/api-routes/introduction)

`Next.js` 支持 API Routes，这让我们可以轻松地将 API endpoint 创建为 `Node.js` 无服务器函数（serverless function），也称为 Lambdas。

## Creating a simple API endpoint

在 `pages/api` 目录下创建一个 `hi.js`，如下：

```js
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  res.status(200).json({ text: 'Hi' });
}
```

它们可以部署为无服务器函数（也称为 Lambdas）。

通过访问 `http://localhost:3000/api/hi` 可以看到结果，注意：

- req 是 [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 的一个实例，加上一些 pre-built [middlewares](https://nextjs.org/docs/api-routes/api-middlewares)。
- res 是 [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) 的一个实例，加上一些 [helper functions](https://nextjs.org/docs/api-routes/response-helpers)。

## API Routes Details

### Do Not Fetch an API Route from getStaticProps or getStaticPaths

不应从 `getStaticProps` 或 `getStaticPaths` 请求 API Route。相反，直接在 `getStaticProps` 或 `getStaticPaths` 中编写服务器端代码（或调用 [helper function](https://nextjs.org/docs/api-routes/response-helpers)）。

原因如下： `getStaticProps` 和 `getStaticPaths` 仅在服务器端运行，永远不会在客户端运行。此外，这些功能不会包含在浏览器的 JS 包中。这意味着您可以编写直接数据库查询等代码，而无需将它们发送到浏览器。阅读 [Write Server-side code](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly) 文档以了解更多信息。

### 一个很好的用例：处理表单输入

API Route 的一个很好的用例是处理表单输入。例如，可以在页面上创建一个表单，并让它向 API Route 发送一个 POST 请求。然后编写代码将其直接保存到数据库中。 API Route 代码不会成为客户端 JS 包的一部分，因此可以安全地编写服务器端代码，例如：

```js
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```

### Preview Mode

当页面从 headless CMS 获取数据时，[Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) 很有用。但是，当在 headless CMS 上撰写草稿并希望立即在页面上预览草稿时，这并不理想。Next.js 只会在请求时（request time）而不是构建时（build time）渲染这些页面，并获取草稿内容而不是已发布的内容。Next.js 仅针对这种特定情况绕过静态生成。

Next.js 有一个名为 `Preview Mode` 的功能来解决上述问题，它利用了 [API Routes](https://nextjs.org/docs/api-routes/introduction)。要了解更多信息，请查看 [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) 文档。

### Dynamic API Routes

API 路由可以是动态的，就像常规页面一样。查看 [Dynamic API Routes](https://nextjs.org/docs/api-routes/dynamic-api-routes) 文档以了解更多信息。
