import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function FirstPost() {
  const title = 'First Post';

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* 
            需要尽快加载和执行的脚本通常添加在页面的 <head> 中
            此脚本包含 Facebook SDK，通常用于引入 Facebook 社交插件和其他功能。
            尽管这种方法有效，但以这种方式包含脚本并不能清楚地说明何时加载相对于在同一页面上获取的其他 JavaScript 代码。
            如果特定脚本会阻塞呈现并且会延迟页面内容的加载，这会显着影响性能。
        */}
        <script src="https://connect.facebook.net/en_US/sdk.js"></script>
      </Head>
      <h1>{title}</h1>
      <Image
        src='/images/profile.jpg' // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt='Your Name'
      />
      <h2>
        <Link href='/'>Back to home</Link>
      </h2>
    </>
  );
}
