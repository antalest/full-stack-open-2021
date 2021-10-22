describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'ana',
      name: 'Antti A',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ana')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Antti A logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ana')
      cy.get('#password').type('väärin')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Antti A logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ana', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#create-button').click()
      cy.get('.blogTitle').should('contain', 'Test title').and('contain', 'Test author')
      cy.get('#view-button').click()
      cy.get('.blogURL').should('contain', 'Test url')
    })

    describe('and when a blog has been created by the logged user', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Test title', author: 'Test author', url: 'Test url' })
      })

      it('the blog can be liked', function() {
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('the blog can be removed', function() {
        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.get('html').should('not.contain', 'Test title')
      })
    })

    describe('and when multiple blogs have been created by the logged user', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Test title 1', author: 'Test author 1', url: 'Test url 1' })
        cy.createBlog({ title: 'Test title 2', author: 'Test author 2', url: 'Test url 2' })
      })

      it('blogs are shown in descending order of likes', function() {
        cy.get('.blogTitle').then( titles => {
          console.log('titles ', titles.length)
          cy.wrap(titles[0]).should('contain', 'Test title 1')
        })

        cy.contains('Test title 2').find('#view-button').as('viewButton2')
        cy.get('@viewButton2').click()
        cy.contains('Test title 2').parent().find('#like-button').as('likeButton2')
        cy.get('@likeButton2').click()
        cy.contains('likes 1')

        cy.get('.blogTitle').then( titles => {
          console.log('titles ', titles.length)
          cy.wrap(titles[0]).should('contain', 'Test title 2')
        })
      })
    })
  })

})