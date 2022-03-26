/// <reference types="cypress" />

class TodoPage{

    visit()
    {
      cy.visit("https://todomvc.com/examples/react/#/active")
    }

  addItems(value)
{
    const field=cy.get('.new-todo')
    field.clear()
    field.type(value).type('{enter}')
    cy.scrollTo('top')
    return this
}

editItems(value)
{
   
    const editfield=cy.get('ul.todo-list').children()
    const item=editfield.first().dblclick()
    item.type(value).type('{enter}')
    cy.scrollTo('top')
    return this
}

completeItems()
{    
    const selectItem=cy.get('.todo-list') 
    .should('have.length',1)
    .find('input[type=checkbox]').check()
    cy.scrollTo('top')
}

activeItems()
{ 
    this.completeItems()
    const item1=cy.get('.todo-list') 
    cy.contains('Active').click()
    cy.scrollTo('top')
   
}

clearCompletedItems()
{

    const item1=cy.get('.todo-list')
    cy.contains('Clear completed').click()
    cy.scrollTo('top')
}
    

}

export default TodoPage
