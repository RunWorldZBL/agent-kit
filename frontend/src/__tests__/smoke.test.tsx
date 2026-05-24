import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "../App";

function renderApp() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}

describe("App", () => {
  it("renders the template shell", async () => {
    renderApp();
    expect(screen.getByText("Fullstack starter")).toBeInTheDocument();
    expect(await screen.findByText("First item")).toBeInTheDocument();
  });
});
