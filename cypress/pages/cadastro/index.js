class Cadastro {
  preencherFormulario() {
    const timestamp = new Date().getTime();

    const signUpName = "Tester QA";

    Cypress.env("signUpName", signUpName);
    cy.get("[href$=login]").click();
    cy.get('[data-qa="signup-name"]').type(Cypress.env("signUpName"));
    cy.get("[data-qa=signup-email]").type(`ironman${timestamp}@mail.com.br`);
    cy.get('[data-qa="signup-button"]').click();
    cy.get("input[type=radio]").eq(0).check();
    cy.get('[data-qa="password"]').type("123456", { log: false });
    cy.get("[data-qa=days]").select(25);
    cy.get('[data-qa="months"]').select(5);
    cy.get('[data-qa="years"]').select("1989");
    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();
    cy.get('[data-qa="first_name"]').type("João");
    cy.get('[data-qa="last_name"]').type("Silva");
    cy.get('[data-qa="company"]').type("Silva Industries");
    cy.get('[data-qa="address"]').type("xxxx");
    cy.get('[data-qa="country"]').type("Unites States");
    cy.get('[data-qa="state"]').type("California");
    cy.get('[data-qa="city"]').type("Los Angeles");
    cy.get('[data-qa="zipcode"]').type("8789498");
    cy.get('[data-qa="mobile_number"]').type("378 98562-8781");
    cy.get('[data-qa="create-account"]').click();
    cy.get("b").should("contain", "Account Created!");
    cy.url().should("includes", "account_created");
    cy.get('[data-qa="account-created"]').should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
  }
}

export default new Cadastro();
