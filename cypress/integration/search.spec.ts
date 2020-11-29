describe('search', () => {  
  beforeEach(() => {
    cy.visit(`/`)
  })

  it('should be found cave', () => {
    // cy.intercept({
    //   method: 'GET',
    //   hostname: 'localhost',
    //   port: 3001,
    //   https: false,
    //   pathname: 'api/search.php',
    //   query: {
    //     searchPrefix: /.*/
    //   }
    // }, { fixture: 'search.json' })

    // cy.get('.Groups-search__input').type('дру')

    // cy.get('#caves-0').should('have.text', 'Пещера Дружба')
  })
})
