describe("Auth redirects", () => {
  it("redirects to /auth if not logged in and /boards or /reports are accessed", () => {
    // tests for unauthorized access to /boards
    // check that the redirect works when visiting /boards
    cy.visit("/boards");
    cy.url().should("include", "/auth");

    // test for unauthorized access to /reports
    // check that the redirect works when visiting /reports
    cy.visit("/reports");
    cy.url().should("include", "/auth");
  });

  it("redirects to /boards if logged in", () => {
    cy.visit("/auth");

    // sign in
    cy.get("#signin-email").type("cypress@test.com");
    cy.get("#signin-password").type("password");
    cy.contains("button", "Sign In").click();

    // check that the redirect works when visiting /boards
    cy.url().should("include", "/boards");

    // check that the redirect works when visiting / again
    cy.visit("/");
    cy.url().should("include", "/boards");

    // check that the redirect works when visiting /auth again
    cy.visit("/auth");
    cy.url().should("include", "/boards");
  });
});
