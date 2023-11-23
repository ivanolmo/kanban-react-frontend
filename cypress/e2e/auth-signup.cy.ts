describe("Sign up page", () => {
  it("signs up with test credentials", () => {
    // visit the auth page
    cy.visit("/auth");

    // switch to sign up form
    cy.get("#signup-overlay-btn").should("be.visible").click();

    // generate random email and password
    const randomEmail = `cypress${Math.floor(Math.random() * 100000)}@test.com`;
    const randomPassword = `password${Math.floor(Math.random() * 100000)}`;

    // enter test credentials
    cy.get("#signup-email").type(randomEmail);
    cy.get("#signup-password").type(randomPassword);
    cy.get("#signup-password-confirmation").type(randomPassword);

    // click the sign up button
    cy.contains("button", "Sign Up").click();

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

  it("attempts to sign up with invalid email", () => {
    // visit the auth page
    cy.visit("/auth");

    // switch to sign up form
    cy.get("#signup-overlay-btn").should("be.visible").click();

    // enter invalid email and password
    cy.get("#signup-email").type("invalidEmail");
    cy.get("#signup-password").type("password");
    cy.get("#signup-password-confirmation").type("password");

    // click the sign up button
    cy.contains("button", "Sign Up").click();

    // assert error message
    cy.contains("Invalid email address").should("be.visible");
  });

  it("attempts to sign up with mismatched passwords", () => {
    // visit the auth page
    cy.visit("/auth");

    // switch to sign up form
    cy.get("#signup-overlay-btn").should("be.visible").click();

    // enter email and mismatched passwords
    cy.get("#signup-email").type("cypress@test.com");
    cy.get("#signup-password").type("password");
    cy.get("#signup-password-confirmation").type("differentPassword");

    // click the sign up button
    cy.contains("button", "Sign Up").click();

    // assert error message
    cy.contains("The passwords do not match").should("be.visible");
  });

  it("attempts to sign up with existing credentials", () => {
    // visit the auth page
    cy.visit("/auth");

    // switch to sign up form
    cy.get("#signup-overlay-btn").should("be.visible").click();

    // enter existing credentials
    cy.get("#signup-email").type("cypress@test.com");
    cy.get("#signup-password").type("password");
    cy.get("#signup-password-confirmation").type("password");

    // click the sign up button
    cy.contains("button", "Sign Up").click();

    // assert error message from #signup-error
    cy.get("#signup-error")
      .should("be.visible")
      .contains("Email is already in use");
  });
});
