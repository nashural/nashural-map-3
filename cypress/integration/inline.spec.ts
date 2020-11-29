import manpupuner from '../fixtures/manpupuner.json'

describe('inline mode', () => {  
  beforeEach(() => {
    cy.visit(`/?place=${encodeURIComponent(manpupuner.place)}&lat=${manpupuner.lat}&lon=${manpupuner.lon}&zoom=${manpupuner.zoom}`)
  })

  it('should be rendered inline', () => {
    cy.get('.Header-place').should('have.text', manpupuner.place)

    cy.get('.Map ymaps').wait(2000)
    // @ts-ignore
    cy.get('.Map').compareSnapshot('map')
  })
})
