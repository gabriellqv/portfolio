import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../Button";

describe("Button", () => {
  it("should render correctly with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should apply variant classes correctly", () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button).toHaveClass("bg-white");
  });

  it("should be disabled when disabled prop is passed", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
