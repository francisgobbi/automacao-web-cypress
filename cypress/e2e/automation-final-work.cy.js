import cadastro from '../pages/cadastro';
import login from '../pages/login';
import menu from '../pages/menu';

describe('Web Automation Final Work', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com/');
  });

  it('Test Case 1: Register User', () => {
    menu.irParaLoginCadastro();
    cadastro.preencherFormulario();
    cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'));
  });

  it('Test Case 2: Login User with correct email and password', () => {
    menu.irParaLoginCadastro();
    login.preencherLogin('testeqa@email.com', '123456');
    cy.get('i.fa-user').parent().should('contain', 'Teste QA');
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.irParaLoginCadastro();
    login.preencherLogin('tester-123467891223@mail.com', '412345');
    cy.get(`.login-form form p`).should(
      'contain',
      'Your email or password is incorrect!',
    );
  });

  it('Test Case 4: Logout User', () => {
    menu.irParaLoginCadastro();
    login.preencherLogin('testeqa@email.com', '123456');
    cy.get('i.fa-user').parent().should('contain', 'Teste QA');
    cy.contains('Logout').click();
    cy.url().should('contain', 'login');
    cy.contains('Login to your account').should('be.visible');
  });

  it('Test Case 5: Register User with existing email', () => {
    menu.irParaLoginCadastro();
    cy.get('[data-qa="signup-name"]').type('Tester QA');
    cy.get('[data-qa="signup-email"]').type('testeqa@email.com');
    cy.contains('button', 'Signup').click();
    cy.get(`.signup-form form p`)
      .should('be.visible')
      .and('contain', 'Email Address already exist!');
  });

  it('Test Case 6: Contact Us Form', () => {
    cy.contains(`Contact us`).click();
    cy.get(`.contact-form h2`)
      .should('be.visible')
      .and('have.text', 'Get In Touch');
    cy.get('[data-qa="name"]').type(`Tester`);
    cy.get('[data-qa="email"]').type(`teste-qa@email.com`);
    cy.get('[data-qa="subject"]').type(`Test Automation`);
    cy.get('[data-qa="message"]').type(`Learning Test Automation`);
    cy.fixture('example.json').as('arquivo');
    cy.get('input[name="upload_file"]').selectFile('@arquivo');
    cy.get('[data-qa="submit-button"]').click();
    cy.get('.status').should(
      'have.text',
      'Success! Your details have been submitted successfully.',
    );
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.irParaProdutos();
    cy.url().should('contain', 'products');
    cy.get('.title').should('be.visible').and('contain', 'All Products');

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)
      .first()
      .parent()
      .contains('View Product')
      .click();
    cy.get('.product-information > h2').should('be.visible');
    cy.get('.product-information p').should('be.visible').and('have.length', 4);
    cy.get('.product-information span span ').should('be.visible');
  });

  it('Test Case 9: Search Product', () => {
    menu.irParaProdutos();
    cy.url().should('contain', 'products');
    cy.get('.title').should('be.visible').and('contain', 'All Products');
    cy.get('input#search_product').type('Shirt');
    cy.get('button#submit_search').click();
    cy.get('.title').should('be.visible').and('contain', 'Searched Products');
    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1);
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.get('input[id="susbscribe_email"]')
      .click()
      .scrollIntoView()
      .type('testeqa@email.com');
    cy.get('button[id="subscribe"]').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const timestamp = new Date().getTime();
    const nome = 'Iron Man';

    cadastro.preencherFormulario();
    cy.contains('Add to cart').click();
    cy.contains('View Cart').click();
    cy.get('.btn-default.check_out').should('be.visible');
    cy.get('.btn-default.check_out').click();
    cy.get(':nth-child(2) > .heading').should('have.text', 'Address Details');
    cy.get(':nth-child(4) > .heading').should('have.text', 'Review Your Order');
    cy.get('.form-control').type('378 98562-8781');
    cy.get('.btn-default.check_out').click();
  });
});
