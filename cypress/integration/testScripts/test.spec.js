/// <reference types="cypress" />

import TodoPage from '../../pages/TodoPage'

const todopage=new TodoPage()

describe('example to-do app', () => {
    beforeEach(() => {
        cy.wait(2000) 
        todopage.visit()
        cy.wait(2000) 
        
    })

    afterEach(() =>{
        cy.scrollTo('top')
    })
        
    

    it('Add todo items', () => {
     
    todopage.addItems('Task 1')
    cy.get('.todo-list').should('have.text', 'Task 1')
    
    })

    it('Edit todo items', () => {
     
        todopage.addItems('Task 1')
        cy.get('.todo-list').should('have.text', 'Task 1')
        todopage.editItems('Task 11')
       
        })


    it('Complete todo items', () => {
     
             todopage.addItems('Task 1')
             cy.get('.todo-list').should('have.text', 'Task 1')
             todopage.completeItems()
             
            
            })


            it('Filter incomplete items', () => {
                
                todopage.addItems('Task 1')
                todopage.completeItems()
                todopage.activeItems()
                cy.contains('Task 1').should('not.exist')


               
               
               })


               it('Delete Completed items', () => {
                
                todopage.addItems('Task 1')
                todopage.completeItems()
                todopage.clearCompletedItems()
                cy.contains('Clear completed').should('not.exist')


                
               
               })

})


