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

## 其他

### Markdown Metadata

`Markdown` 文件顶部有一些元数据定义，其中包含 `title` 和 `date`，这被称为 `YAML Front Matter`，可以使用名为 [gray-matter](https://github.com/jonschlinkert/gray-matter) 的库对其进行解析。

```markdown
---
title: 'x'
date: '2023-03-21'
---
```

### fetch()

Next.js polyfills [fetch()](https://nextjs.org/docs/basic-features/supported-browsers-features) 在客户端和服务器上。不需要导入（import）它。
