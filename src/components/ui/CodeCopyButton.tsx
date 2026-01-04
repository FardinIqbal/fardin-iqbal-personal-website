"use client";

import { useEffect, useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

export function CodeCopyButton() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  useEffect(() => {
    // Find all pre > code elements in prose content
    const codeBlocks = document.querySelectorAll(".prose-article pre");

    codeBlocks.forEach((pre, index) => {
      // Skip if already has a copy button
      if (pre.querySelector(".code-copy-btn")) return;

      const id = `code-block-${index}`;
      pre.setAttribute("data-code-id", id);

      // Create wrapper for positioning
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create copy button
      const button = document.createElement("button");
      button.className = "code-copy-btn";
      button.setAttribute("aria-label", "Copy code");
      button.setAttribute("data-code-id", id);
      button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        if (code) {
          await navigator.clipboard.writeText(code.textContent || "");

          // Toggle icons
          const copyIcon = button.querySelector(".copy-icon") as HTMLElement;
          const checkIcon = button.querySelector(".check-icon") as HTMLElement;

          if (copyIcon && checkIcon) {
            copyIcon.style.display = "none";
            checkIcon.style.display = "block";
            button.classList.add("copied");

            setTimeout(() => {
              copyIcon.style.display = "block";
              checkIcon.style.display = "none";
              button.classList.remove("copied");
            }, 2000);
          }
        }
      });

      wrapper.appendChild(button);
    });

    // Cleanup function
    return () => {
      const wrappers = document.querySelectorAll(".code-block-wrapper");
      wrappers.forEach((wrapper) => {
        const pre = wrapper.querySelector("pre");
        const button = wrapper.querySelector(".code-copy-btn");
        if (pre && button) {
          wrapper.parentNode?.insertBefore(pre, wrapper);
          wrapper.remove();
        }
      });
    };
  }, []);

  return null; // This component only adds event listeners
}
