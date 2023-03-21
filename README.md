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

`Next.js` 的 [Pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering) 分为 [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) 和 [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering), `Static Generation` 又分为 [with data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data) 和 [without data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data).