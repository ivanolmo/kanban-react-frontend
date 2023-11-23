describe("Auth Page", () => {
  it("loads the authentication page correctly", () => {
    cy.visit("/auth");

    // check sign in form
    cy.get("#signin-email").should("be.visible");
    cy.get("#signin-password").should("be.visible");
    cy.contains("button", "Sign In").should("be.visible");

    // click the sign up button to switch the form
    cy.get("#signup-overlay-btn").should("be.visible").click();

    // // check sign up form
    cy.get("#signup-email").should("be.visible");
    cy.get("#signup-password").should("be.visible");
    cy.contains("button", "Sign Up").should("be.visible");

    // click the sign in button to switch the form back to sign in
    cy.get("#signin-overlay-btn").should("be.visible").click();

    // check sign in form again
    cy.get("#signin-email").should("be.visible");
    cy.get("#signin-password").should("be.visible");
    cy.contains("button", "Sign In").should("be.visible");
  });
});
