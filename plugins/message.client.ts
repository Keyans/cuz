import { createVNode, render } from "vue";
import message from "~/components/ui/message/Message.vue";

let div: HTMLDivElement;
let timer: NodeJS.Timeout | null = null;

// 初始化通知容器
const initContainer = () => {
  if (!div) {
    div = document.createElement("div");
    div.setAttribute("class", "message-container");
    document.body.appendChild(div);
  }
};

const sendInfo = (type: "success" | "warn" | "error", text: string) => {
  if (!div) {
    initContainer(); // 如果div为空，说明未初始化，执行初始化
  }

  // 清理已有的通知
  const divs = document.getElementsByClassName("message");
  if (divs.length > 0) {
    clearTimeout(timer as any);
    render(null, div);
  }

  // 创建虚拟节点
  const vNode = createVNode(message, { type, text });

  // 渲染虚拟节点到容器中
  render(vNode, div);

  // 启动定时器，3秒后移除通知
  clearTimeout(timer as any);
  timer = setTimeout(() => {
    render(null, div);
  }, 3000);
};

// 注册全局通知函数
export default defineNuxtPlugin(() => {
  return {
    provide: {
      message: {
        success: (text: string) => sendInfo("success", text),
        warn: (text: string) => sendInfo("warn", text),
        error: (text: string) => sendInfo("error", text),
      },
    },
  };
});
