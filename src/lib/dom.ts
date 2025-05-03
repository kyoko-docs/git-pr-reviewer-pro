// src/lib/dom.ts

/**
 * PRのFiles changedページにおけるファイルコンテナ要素を取得します
 */
export function getFileContainers(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(".js-details-container"),
  );
}

/**
 * 指定したファイルコンテナを折りたたみます
 */
export function collapseContainer(container: HTMLElement): void {
  container.classList.remove("open");
  container.classList.remove("Details--on");
  const content = container.querySelector<HTMLElement>(".js-file-content");
  if (content) content.style.display = "none";
}

/**
 * 指定したファイルコンテナを展開します
 */
export function expandContainer(container: HTMLElement): void {
  container.classList.add("open");
  container.classList.add("Details--on");
  const content = container.querySelector<HTMLElement>(".js-file-content");
  if (content) content.style.removeProperty("display");
}

/**
 * 全ファイルコンテナを折りたたみます
 */
export function collapseAllContainers(): void {
  getFileContainers().forEach(collapseContainer);
}

/**
 * 全ファイルコンテナを展開します
 */
export function expandAllContainers(): void {
  getFileContainers().forEach(expandContainer);
}

/**
 * 各ファイルのトグルボタンにクリックリスナーを設定し、
 * ユーザー操作時に inline display をクリアします
 */
export function attachToggleListeners(): void {
  document
    .querySelectorAll<HTMLButtonElement>("button.js-details-target")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const container = btn.closest<HTMLElement>(".js-details-container");
        const content =
          container?.querySelector<HTMLElement>(".js-file-content");
        if (content) content.style.removeProperty("display");
      });
    });
}
