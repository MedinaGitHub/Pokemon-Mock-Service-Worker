import { render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { server } from "../__mocks__/server";
import PokemonList from "../components/PokemonList";

// Enable API mocking before tests
beforeAll(() => server.listen());

// Reset any request handlers after each test
afterEach(() => server.resetHandlers());

// Disable API mocking after all tests
afterAll(() => server.close());

describe("PokemonList", () => {
  it("renders Pokemon list correctly", async () => {
    render(<PokemonList />);

    // Wait for the API call to complete and data to be rendered
    await waitFor(
      () => {
        expect(screen.getByText("Pokemon List")).toBeTruthy();
      },
      { timeout: 5000 }
    );
  });

  it("displays Charizard in the Pokemon list", async () => {
    render(<PokemonList />);

    // Wait for the API call to complete and check if Charizard is displayed
    await waitFor(() => {
      expect(screen.getByText("charizard")).toBeTruthy();
    });

    // Also check for the testID
    expect(screen.getByTestId("pokemon-charizard")).toBeTruthy();
  });

  it("displays Pokemon images correctly", async () => {
    render(<PokemonList />);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(screen.getByText("Pokemon List")).toBeTruthy();
    });

    // Check if multiple Pokemon are rendered (we should have 20)
    expect(screen.getByText("bulbasaur")).toBeTruthy();
    expect(screen.getByText("charmander")).toBeTruthy();
  });

  it("displays Pokemon with correct ID numbers", async () => {
    render(<PokemonList />);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(screen.getByText("charizard")).toBeTruthy();
    });

    // Check if Charizard has the correct ID (should be #6)
    expect(screen.getByText("#6")).toBeTruthy();
  });
});
