describe("Login page", () => {
  it("logs in with test credentials", () => {
    // visit the auth page
    cy.visit("/auth");

    // enter test credentials
    cy.get("#signin-email").type("cypress@test.com");
    cy.get("#signin-password").type("password");

    // click the sign in button
    cy.contains("button", "Sign In").click();

    // assert redirect to boards page
    cy.url().should("include", "/boards");

    // sign out
    // get the menu that contains the button, then open it
    cy.get("[data-testid='header-menu-button']").should("be.visible").click();
    // click the sign out button
    cy.contains("span", "Sign Out").should("be.visible").click();

    // assert redirect back to home page
    cy.url().should("include", "/");
  });

  it("attempts to login with invalid credentials", () => {
    // visit the auth page
    cy.visit("/auth");

    // enter invalid credentials
    cy.get("#signin-email").type("cypress@test.com");
    cy.get("#signin-password").type("pass");

    // click the sign in button
    cy.contains("button", "Sign In").click();

    // assert error message
    cy.contains("Invalid email or password").should("be.visible");
  });
});
