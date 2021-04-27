import Emails from '../../../src/data/emails'

describe('UI tests', () => {
  it('can display emails', () => {
    cy.viewport('iphone-x')
    cy.visit('/')
    cy.getByData('email').should('have.length', Emails.data.value.length)
  })

  it('can swipe to delete', () => {
    cy.viewport('iphone-x')
    cy.visit('/')

    cy.getByData('email').swipe({delay: 100}, [340, 0], [100, 0])
    cy.getByData('email').should('have.length', Emails.data.value.length -1)

    cy.getByData('email').swipe({delay: 100}, [100, 0], [304, 0])
    cy.getByData('email').should('have.length', Emails.data.value.length -1)
  })

  it('can search emails', () => {
    cy.viewport('iphone-x')
    cy.visit('/')

    cy.getByData('search').type('Amazon')
    cy.getByData('email').should('have.length', 3)

    cy.getByData('search').clear('Amazon')
    cy.getByData('email').should('have.length', Emails.data.value.length)
  })

  it('can star an email', () => {
    cy.viewport('iphone-x')
    cy.visit('/')

    const starred = Emails.data.value.filter(e => e.isStarred).length

    cy.getByData('star').first().click()
    cy.getByData('star').find('svg.text-yellow-500').should('have.length', starred + 1)
    
    cy.getByData('star').first().click()
    cy.getByData('star').find('svg.text-yellow-500').should('have.length', starred)

  })

  it('can open an email', () => {
    cy.viewport('iphone-x')
    cy.visit('/')

    cy.getByData('email').first().click()
    cy.getByData('read-view').should('contain', Emails.data.value[0].subject)
    cy.getByData('read-view').should('contain', Emails.data.value[0].from)
    cy.getByData('read-view').should('contain', Emails.data.value[0].date)
  })

  it('can delete an email from read view', () => {
    cy.viewport('iphone-x')
    cy.visit('/')

    cy.getByData('email').first().click()
    cy.url().should('contain', '/email/1')
    cy.getByData('delete').click()
    cy.getByData('email').should('have.length', Emails.data.value.length - 1)
    cy.url().should('contain', '/inbox')
  })

  it('can star an email from read view', () => {
    cy.viewport('iphone-x')
    cy.visit('/')

    const starred = Emails.data.value.filter(e => e.isStarred).length

    cy.getByData('email').first().click()
    cy.url().should('contain', '/email/1')
    cy.getByData('read-view--star').click().should('have.class', 'text-yellow-500')
    cy.getByData('read-view--back').click()
    cy.url().should('contain', '/inbox')

    cy.getByData('star').find('svg.text-yellow-500').should('have.length', starred + 1)
  })

  it('can hide/show the search bar on scroll', () => {
    cy.viewport('iphone-x')
    cy.visitMobile('/')

    cy.getByData('inbox').shadow().find('.inner-scroll').scrollTo('bottom', { duration: 500 })
    cy.getByData('search-container').should('not.be.visible')
    cy.getByData('inbox').shadow().find('.inner-scroll').scrollTo('top', { duration: 500 })
    cy.getByData('search-container').should('be.visible')
  })
})
