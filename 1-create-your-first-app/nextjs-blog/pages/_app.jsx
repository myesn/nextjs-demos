import '../styles/global.css';

/**
 * _app.js 的默认导出是一个顶级 React 组件，它包装了应用程序中的所有页面。
 * 可以使用此组件在页面之间导航时保​​持状态，或者像我们在这里所做的那样添加全局样式。
 * https://nextjs.org/docs/advanced-features/custom-app
 * 
 * 重要提示：添加 pages/_app.js 时需要重启开发服务器。
 */
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
