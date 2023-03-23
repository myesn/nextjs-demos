import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

// 由于改为了 Dynamic Routes，所以这里移除 first-post.jsx 文件

export default function FirstPost() {
  const title = 'First Post';

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        {/* 
            需要尽快加载和执行的脚本通常添加在页面的 <head> 中。
            此脚本包含 Facebook SDK，通常用于引入 Facebook 社交插件和其他功能。
            尽管这种方法有效，但以这种方式包含脚本并不能清楚地说明何时加载相对于在同一页面上获取的其他 JavaScript 代码。
            如果特定脚本会阻塞呈现并且会延迟页面内容的加载，这会显着影响性能。
        */}
        {/* <script src='https://connect.facebook.net/en_US/sdk.js'></script> */}
      </Head>

      {/* 
          next/script 是 HTML <script> 元素的扩展，并在获取和执行其他脚本时进行优化。
          属性含义：
          strategy 控制何时加载第三方脚本。 lazyOnload 的值告诉 Next.js 在浏览器空闲时间延迟加载这个特定的脚本
          onLoad 用于在脚本完成加载后立即运行任何 JavaScript 代码。在此示例中，我们向控制台记录一条消息，指出脚本已正确加载
      */}
      <Script
        src='https://connect.facebook.net/en_US/sdk.js'
        strategy='lazyOnload'
        onLoad={() => {
          console.log(`script loaded correctly, window.FB has been populated`);
          console.log(window.FB);
        }}
      />

      <h1>{title}</h1>
      <Image
        src='/images/profile.jpg' // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        priority={true} // 当为真时，图像将被视为高优先级和预加载。使用 priority 的图像会自动禁用延迟加载。
        alt='Your Name'
      />
      <h2>
        <Link href='/'>Back to home</Link>
      </h2>
    </Layout>
  );
}
