

describe("My First Test", () => {
  const email = "test@test.com";
  const password = "ThisIsASecurePassword1$";

  const TESTACCESSTOKENEXP = Cypress.env("TESTACCESSTOKENEXP");
  const TESTREFRESHTOKENEXP = Cypress.env("TESTREFRESHTOKENEXP");
  beforeEach(() => {
   
    
    cy.log(TESTREFRESHTOKENEXP);
    cy.log(TESTACCESSTOKENEXP);
    cy.login("test@test.com", password)
    
    // cy.visit("/");
    // cy.get("#tab-button-account").click();
    // cy.get('input[name="email"]').type(email);
    // cy.get('input[name="password"]').type(password);
    // cy.intercept("POST", "http://localhost:3000/api/login").as("loginRequest");
    // cy.get("#login").click();
  });

  it("Login works when access token expired", () => {
    // cy.wait(Number(TESTACCESSTOKENEXP*1000));
    cy.wait(Number(TESTACCESSTOKENEXP*1000)).then(() => {
      const cartButton = cy.get("#tab-button-cart");
      cartButton.click();
      const x = cy.get('ion-title[data-test="title"]').contains('Order')
      cy.log(x)

    })
    // cy.url().should("equal", "http://localhost:8100/cart");
    
  });

  it("Succesfully adds to cart", () => {
    cy.get('li[data-test="item"').first().click().then(() => {
      cy.get('ion-button[name="add-to-order"]').click()
      cy.get('ion-toast[is-open="true"]')
      cy.wait(8000)
    })
  });

  it.only("Succesfully adds to cart", () => {
    
    const item = cy.get('li[data-test="item"').first().click()
    const cartButton = cy.get('ion-button[name="add-to-order"]').then((e) => {
      const basePrice = parseFloat(e.attr('data-test'));
     
      cy.log(basePrice)

    item.then(() => {
      // cy.get('ion-button[name="add-to-order"]').click()
      // cy.get('ion-toast[is-open="true"]')
      cy.get('button[name="customization-button"]').first().click()
      cy.get('ion-select').first().click()
      cy.get('ion-radio').contains('1/4 Splash').click().then(() => {
        cy.get('button[name="customization-button"]').eq(1).click();
        cy.get('ion-item').last().click();
        
        cy.get('ion-button[name="add-to-order"]').click();
        cy.get("#tab-button-cart").click();
      
        let total = basePrice; // Assuming basePrice is defined earlier in your script
        cy.log(total)
        cy.get('div[name="price-modifier"]').each(($el) => {
          const modifier = parseFloat($el.attr('data-test'));
          cy.log(modifier)
          total += modifier; // Accumulate the modifier
        }).then(() => {
          // After .each() is complete, total is updated
          cy.log('Total: ' + total);
          // You can add more assertions or operations here with the updated total
        });
      });
      
       

      // cy.get('ion-select').first().click()
      })

      
      
    })
  });
  

  
});
