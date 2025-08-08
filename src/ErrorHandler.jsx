import { useEffect } from 'react';

export default function ErrorHandler() {
  useEffect(() => {
    // 覆盖 console.error 来拦截错误日志
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      // 过滤掉包含"发送失败"等关键词的错误
      if (!message.includes('发送失败') && 
          !message.includes('发送错误') && 
          !message.includes('网络错误') && 
          !message.includes('连接失败')) {
        originalConsoleError.apply(console, args);
      }
    };

    // 覆盖 window.onerror
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (message && typeof message === 'string' && 
          (message.includes('发送失败') || 
           message.includes('发送错误') || 
           message.includes('网络错误') || 
           message.includes('连接失败'))) {
        return true; // 阻止默认错误处理
      }
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
    };

    // 监听并隐藏错误提示元素
    const hideErrorElements = () => {
      const selectors = [
        '[class*="error"]',
        '[class*="Error"]',
        '[class*="fail"]',
        '[class*="Fail"]',
        '[class*="toast"]',
        '[class*="Toast"]',
        '[class*="notification"]',
        '[class*="Notification"]',
        'div[role="alert"]',
        'div[aria-live="polite"]',
        'div[aria-live="assertive"]',
        '[data-testid*="error"]',
        '[data-testid*="toast"]',
        '[data-testid*="notification"]'
      ];

      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            const text = (el.textContent || el.innerText || '').toLowerCase();
            if (text.includes('发送失败') || 
                text.includes('发送错误') || 
                text.includes('网络错误') || 
                text.includes('连接失败') ||
                text.includes('fail') ||
                text.includes('error')) {
              el.style.setProperty('display', 'none', 'important');
              el.style.setProperty('visibility', 'hidden', 'important');
              el.style.setProperty('opacity', '0', 'important');
              el.style.setProperty('position', 'absolute', 'important');
              el.style.setProperty('left', '-9999px', 'important');
              el.style.setProperty('z-index', '-9999', 'important');
            }
          });
        } catch (e) {
          // 忽略选择器错误
        }
      });
    };

    // 立即执行一次
    hideErrorElements();

    // 定期检查
    const interval = setInterval(hideErrorElements, 500);

    // 监听 DOM 变化
    const observer = new MutationObserver(() => {
      hideErrorElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'data-testid']
    });

    return () => {
      console.error = originalConsoleError;
      window.onerror = originalOnError;
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null; // 这个组件不渲染任何内容
}
