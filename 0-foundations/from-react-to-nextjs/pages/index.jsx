import { useState } from "react";

// Capitalize the React Component
function Header({ title }) {
  // 当处于“JSX 领域”时，可以将花括号视为进入“JavaScript 领域”的一种方式。可以在花括号内添加任何 JavaScript 表达式（计算结果为单个值的东西）
  return <h1>{title ? title : "Default title"}</h1>;
}

// 将默认导出添加到您的主要 React 组件，以帮助 Next.js 区分将哪个组件呈现为该页面的主要组件
export default function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];
  // useState() 函数的参数是 state 的初始值
  // useState() 返回一个数组，可以使用数组解构在组件中访问和使用这些数组值
  // 数组中的第一项是状态 value ，可以为它命名。建议将其命名为描述性的名称
  // 数组中的第二项是 update 值的函数。你可以给更新函数起任何名字，但通常在它前面加上 set ，后跟你要更新的状态变量的名称
  // 与作为第一个函数参数传递给组件的 props 不同， state 是在组件中初始化和存储的。可以将 state 信息作为 props 传递给子组件，但是更新 state 的逻辑应该保留在最初创建 state 的组件中。
  const [likes, setLikes] = useState(0);

  function handleLikeClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      {/* Nesting the Header component */}
      <Header title="React With Next.js 💙" />
      <Header />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {/* 监听事件（在 React 中，事件名称是驼峰式的） */}
      <button onClick={handleLikeClick}>Like({likes})</button>
    </div>
  );
}
