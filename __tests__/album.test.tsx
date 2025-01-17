import { act, render } from "@testing-library/react";

import Album from "@/components/Album";

import { albums } from "@/lib/mock";

describe("Album", () => {

  it("Renders an album", async () => {
    const { container } = render(<Album title="My Test Album" id={22222222} viewArtist={() => {}} isArtistView={false} coverImage={albums[0].coverImage} favorite={() => {}} isFavorite={false}/>)

    const elements = await act( () => container.getElementsByClassName('album') );

    expect(elements.length).toBe(1);

  });

  it("Renders the album title", async () => {
    const { container } = render(<Album title="My Test Album" id={22222222} viewArtist={() => {}} isArtistView={false} coverImage={albums[0].coverImage} favorite={() => {}} isFavorite={false}/>)

    const elements = await act( () => container.getElementsByClassName('album') );
    const titleElements = await act( () => elements[0].getElementsByClassName('album__title'));

    expect(titleElements.length).toBe(1);
    expect(titleElements[0]).not.toBeNull();

  });
});