describe("Boards Page", () => {
  beforeEach(() => {
    // visit auth page and log in with test credentials
    cy.visit("/auth");
    cy.get("#signin-email").type("cypress@test.com");
    cy.get("#signin-password").type("password");
    cy.contains("button", "Sign In").click();

    // redirects to boards page
  });

  it("should display the boards page for authenticated users", () => {
    // assert that the boards page is displayed
    cy.contains("h1", "No Boards").should("be.visible");
  });

  it("should create a new board, check it exists, then delete it", () => {
    // click the create board button
    cy.contains("button", "Create New Board").click();

    // assert that the create board form is displayed
    cy.contains("h2", "Add New Board").should("be.visible");

    // enter board name and click create
    cy.get('input[placeholder="e.g. Web Design"]').type("Cypress Test Board");
    // create button has an id create-board-btn
    cy.get("#add-board-btn").click();

    // assert that the board name is displayed
    cy.contains("h1", "Cypress Test Board").should("be.visible");

    // get the menu that contains the delete board button, then open it
    cy.get("[data-testid='header-menu-button']").should("be.visible").click();
    // click the sign out button
    cy.contains("span", "Delete Board").should("be.visible").click();
    // click the confirm button
    cy.contains("span", "Delete").should("be.visible").click();

    // assert that the board name is no longer displayed
    cy.contains("h1", "Cypress Test Board").should("not.exist");
  });
});
