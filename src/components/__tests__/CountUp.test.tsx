import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CountUp from "../CountUp";

describe("CountUp", () => {
  let intersectionCallback:
    | ((entries: Partial<IntersectionObserverEntry>[]) => void)
    | null = null;

  beforeEach(() => {
    vi.useFakeTimers();

    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();

      constructor(callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
        intersectionCallback = callback;
      }
    }

    window.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof window.IntersectionObserver;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    intersectionCallback = null;
  });

  it("should render initial value in aria-label for accessibility", () => {
    render(<CountUp value="178+" />);
    const el = screen.getByLabelText("178+");
    expect(el).toBeInTheDocument();
  });

  it("should start with 0 and count up to target upon intersection", () => {
    render(<CountUp value="5" duration={1000} />);
    const el = screen.getByLabelText("5");

    // Initially formatted as 0 before viewport entrance
    expect(el.textContent).toBe("0");

    // Simulate entering viewport
    act(() => {
      intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    // Advance through the initial reveal delay and animation
    act(() => {
      vi.advanceTimersByTime(200); // 120ms start delay + first frame
    });

    // Advance to end of duration
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(el.textContent).toBe("5");
  });

  it("should preserve suffix during animation for composite values", () => {
    render(<CountUp value="178+" duration={1000} />);
    const el = screen.getByLabelText("178+");

    expect(el.textContent).toBe("0+");

    act(() => {
      intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(el.textContent).toBe("178+");
  });

  it("should reset to 0 when scrolled out of view to allow re-animation", () => {
    render(<CountUp value="3" duration={1000} />);
    const el = screen.getByLabelText("3");

    act(() => {
      intersectionCallback?.([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(el.textContent).toBe("3");

    // Simulate scrolling out of view
    act(() => {
      intersectionCallback?.([{ isIntersecting: false } as IntersectionObserverEntry]);
    });

    expect(el.textContent).toBe("0");
  });
});
