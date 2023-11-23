describe("Home Page", () => {
  it("displays the main logo and sign-in message", () => {
    cy.visit("/");

    // Check for the presence of the logo
    cy.get('img[alt="logo"]').should("be.visible");

    // Check for the sign-in message
    cy.contains("You must be signed in to use this application!").should(
      "be.visible",
    );

    // Check for the presence of the sign-in button and simulate a click
    cy.contains("Sign in").should("be.visible").click();

    // Assert that the click was successful and the user was redirected to the sign-in page
    cy.url().should("include", "/auth");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
