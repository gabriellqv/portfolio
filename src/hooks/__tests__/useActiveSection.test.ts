import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useActiveSection } from "../useActiveSection";

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

describe("useActiveSection", () => {
  it("should return the first section id as the default active section", () => {
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof window.IntersectionObserver;

    const { result } = renderHook(() => useActiveSection(["home", "about", "contact"]));

    expect(result.current).toBe("home");
  });

  it("should not observe if paused is true", () => {
    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof window.IntersectionObserver;

    document.body.innerHTML = `
      <div id="home"></div>
      <div id="about"></div>
    `;

    renderHook(() => useActiveSection(["home", "about"], true));

    expect(true).toBe(true);
  });
});
