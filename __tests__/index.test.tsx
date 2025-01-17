import { act, render, screen } from "@testing-library/react";

import Home from "@/pages";
import { albums } from "@/lib/mock";

// Mock fetch calls
global.fetch = jest.fn(() => Promise.resolve({json: () => Promise.resolve({ albums })})) as jest.Mock;

describe("Home", () => {
  it("renders the title header", async () => {
    
    render(<Home />);

    const header = await act( () => screen.getByRole('heading', { level: 1 } ));
    
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('Music Discovery');
  });

  it("Renders the Load More Button", async () => {

    const { container } = render(<Home />);
    const loadMoreButton = await act( () => container.querySelector('#load-more') );

    expect(loadMoreButton).toBeInTheDocument();
    
  });

  it("Render 8 albums on initial load", async () => {

    const { container } = render(<Home />);
    const elements = await act( () => container.getElementsByClassName('album') );
    expect(elements.length).toBe(8);

  });
});

