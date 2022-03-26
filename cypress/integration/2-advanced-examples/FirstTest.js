describe('MyTestSuit', () => {
    it('Verify the title of the page positive', () => {
     
        cy.visit('https://www.nopcommerce.com/en')
        cy.title().should('eq','Free and open-source eCommerce platform. ASP.NET based shopping cart. - nopCommerce' )

    })

    it('Verify the title of the page negetive', () => {
     
        cy.visit('https://www.nopcommerce.com/en')
        cy.title().should('eq','-source eCommerce platform. ASP.NET based shopping cart. - nopCommerce' )

    })
  })
  