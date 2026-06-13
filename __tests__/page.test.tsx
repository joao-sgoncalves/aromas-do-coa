import { screen, render } from "@testing-library/react";

import HomePage from "@/app/page";

test("HomePage", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Hello, Aromas do Côa!" }),
  ).toBeVisible();
});
