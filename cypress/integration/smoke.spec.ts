describe("nashural-map-3", () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders', () => {
    cy.get('title').should('contain.text', 'Интерактивная карта Нашего Урала')
  })
})