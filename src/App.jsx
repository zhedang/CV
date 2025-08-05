import "@coze/chat-sdk/webCss";
import ChatSdk from "@coze/chat-sdk/webJs";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 12, background: "#f0f2f5", color: "#222"
    }}>
      <h1>Welcome to Zhe Dang's Space</h1>
      <p>Your AI assistant is not intelligent...</p>

      <ChatSdk.ChatFramework
        chat={{ appId: "7534521203642335232", type: ChatSdk.ChatType.Bot }}
        setting={{ apiBaseUrl: "/coze", language: ChatSdk.Language.ZH, logLevel: "debug" }}
        auth={{ token: import.meta.env.VITE_COZE_TOKEN }}
        user={{ id: "rayman-001" }}
        ui={{
          header: {
            isNeed: true,
            title: "P.P.",
            icon: "https://raw.githubusercontent.com/zhedang/png/main/pp.png",
          },
        }}
      >
        <ChatSdk.ChatSlot className="chat-slot" />
      </ChatSdk.ChatFramework>
    </div>
  );
}
