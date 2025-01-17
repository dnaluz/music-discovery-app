import { act, render, screen } from "@testing-library/react";

import Modal from "@/components/Modal";

describe("Modal", () => {

  it("Renders", async () => {

    const { container } = render(<Modal title="My Modal" onClose={() => {}} ariaHidden={true} />)
    const elements = await act( () => container.getElementsByClassName('modal') );
    expect(elements.length).toBe(1);

    const title = await act( () => screen.findAllByText("My Modal") );
    expect(title).not.toBe(null);

  });

  it("Renders the proper title", async () => {

    render(<Modal title="My Modal" onClose={() => {}} ariaHidden={true} />)
    const title = await act( () => screen.findAllByText("My Modal") );
    expect(title).not.toBe(null);

  })

});