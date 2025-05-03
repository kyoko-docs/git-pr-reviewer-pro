// src/lib/dom.spec.ts
import { describe, it, expect, beforeEach } from "vitest";
import {
  getFileContainers,
  collapseContainer,
  expandContainer,
  collapseAllContainers,
  expandAllContainers,
  attachToggleListeners,
} from "./dom";

describe("DOM Utils", () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = "";
  });

  it("getFileContainers should return all .js-details-container elements", () => {
    document.body.innerHTML = `
      <div class="js-details-container"></div>
      <div class="js-details-container"></div>
      <div class="other"></div>
    `;
    const containers = getFileContainers();
    expect(containers).toHaveLength(2);
    containers.forEach((el) => {
      expect(el.classList.contains("js-details-container")).toBe(true);
    });
  });

  it("collapseContainer should remove open classes and hide content", () => {
    document.body.innerHTML = `
      <div class="js-details-container open Details--on">
        <div class="js-file-content"></div>
      </div>
    `;
    const container = getFileContainers()[0];
    const content = container.querySelector<HTMLElement>(".js-file-content")!;

    // Ensure initial state
    expect(container.classList.contains("open")).toBe(true);
    expect(content.style.display).toBe("");

    // Collapse
    collapseContainer(container);

    expect(container.classList.contains("open")).toBe(false);
    expect(container.classList.contains("Details--on")).toBe(false);
    expect(content.style.display).toBe("none");
  });

  it("expandContainer should add open classes and show content", () => {
    document.body.innerHTML = `
      <div class="js-details-container">
        <div class="js-file-content" style="display: none;"></div>
      </div>
    `;
    const container = getFileContainers()[0];
    const content = container.querySelector<HTMLElement>(".js-file-content")!;

    // Ensure initial state
    expect(container.classList.contains("open")).toBe(false);
    expect(content.style.display).toBe("none");

    // Expand
    expandContainer(container);

    expect(container.classList.contains("open")).toBe(true);
    expect(container.classList.contains("Details--on")).toBe(true);
    expect(content.style.getPropertyValue("display")).toBe("");
  });

  it("collapseAllContainers and expandAllContainers operate on multiple containers", () => {
    document.body.innerHTML = `
      <div class="js-details-container open Details--on">
        <div class="js-file-content"></div>
      </div>
      <div class="js-details-container open Details--on">
        <div class="js-file-content"></div>
      </div>
    `;
    const containers = getFileContainers();
    collapseAllContainers();
    containers.forEach((c) => {
      const content = c.querySelector<HTMLElement>(".js-file-content")!;
      expect(c.classList.contains("open")).toBe(false);
      expect(content.style.display).toBe("none");
    });

    expandAllContainers();
    containers.forEach((c) => {
      const content = c.querySelector<HTMLElement>(".js-file-content")!;
      expect(c.classList.contains("open")).toBe(true);
      expect(content.style.getPropertyValue("display")).toBe("");
    });
  });

  it("attachToggleListeners should clear inline display on click", () => {
    document.body.innerHTML = `
      <div class="js-details-container">
        <button class="js-details-target"></button>
        <div class="js-file-content" style="display: none;"></div>
      </div>
    `;
    attachToggleListeners();
    const btn =
      document.querySelector<HTMLButtonElement>(".js-details-target")!;
    const content = document.querySelector<HTMLElement>(".js-file-content")!;

    // Simulate click
    btn.click();
    expect(content.style.getPropertyValue("display")).toBe("");
  });
});
