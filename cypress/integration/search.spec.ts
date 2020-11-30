describe('search', () => {  
  beforeEach(() => {
    cy.visit(`/`)
  })

  it('should be found cave', () => {
    cy.get('.Groups-search__input').type('дру')

    cy.get('#caves-0').should('have.text', 'Пещера Дружба')
  })
})
