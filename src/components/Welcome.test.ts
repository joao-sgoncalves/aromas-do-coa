import Welcome from "@components/Welcome.astro";
import { within } from "@testing-library/dom";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { JSDOM } from "jsdom";
import { describe, expect, test } from "vitest";

describe("Welcome component", () => {
  test("renders welcome message", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Welcome);

    const dom = new JSDOM(html);
    const screen = within(dom.window.document.body);

    expect(
      screen.getByRole("heading", {
        name: "Welcome to Aromas do Côa!",
        level: 1,
      }),
    ).toBeInTheDocument();

    dom.window.close();
  });
});
