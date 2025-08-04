// src/App.jsx
import "@coze/chat-sdk/webCss";
import ChatSdk from "@coze/chat-sdk/webJs";

export default function App() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#f0f2f5",
      color: "#222",
      display: "flex",
      flexDirection: "column"
    }}>
      <h1 style={{ margin: "24px 28px 8px" }}>Welcome to Zhe Dang&apos;s Space</h1>
      <p style={{ margin: "0 28px 12px", opacity: 0.7 }}>Your AI assistant is not intelligent...</p>

      {/* 关键：这个容器要占满剩余空间 */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ChatSdk.ChatFramework
          chat={{ appId: "7534521203642335232", type: ChatSdk.ChatType.Bot }}
          setting={{ apiBaseUrl: "http://localhost:8787/coze", language: ChatSdk.Language.ZH, logLevel: "debug" }}
          auth={{ token: "placeholder-token" }} // Use a non-empty placeholder to pass SDK validation
          user={{ id: "rayman-001" }}
          ui={{
            header: {
              isNeed: true,
              title: "P.P.",
              // 你这里用的是 GitHub 的 blob 页面链接，不是直接图片地址。
              // 先临时去掉，保证不受它影响；后面换成 raw 链接再加回：
              // icon: "https://raw.githubusercontent.com/zhedang/png/refs/heads/main/pp.png",
            },
          }}
        >
          <ChatSdk.ChatSlot className="chat-slot" />
        </ChatSdk.ChatFramework>
      </div>
    </div>
  );
}
