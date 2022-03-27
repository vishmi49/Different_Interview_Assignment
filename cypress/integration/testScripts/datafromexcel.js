import TodoPage from "../../pages/TodoPage";

const todopage = new TodoPage();

let rowsLength;
describe("Read Tasks from Excel FIle", () => {
  before(() => {
    //Read data from excel file , covert and write it to a json file
    cy.task("readXlsx", {
      file: "cypress/fixtures/excelData.xlsx",
      sheet: "Sheet1",
    }).then((rows) => {
      rowsLength = rows.length;
      cy.writeFile("cypress/fixtures/xlsxData.json", {
        rows,
      });
    });
  });

  beforeEach(() => {
    //visit url every before each test case with a wait time of 2secs
    cy.wait(2000);
    todopage.visit();

    //Verify the webpage
    cy.title().should('include', 'TodoMVC')
    
  });

  it("Add Tasks", function () {
    //Read tasks from the jason file
    cy.fixture("xlsxData").then(function (data) {
      for (let i = 0; i < rowsLength; i++) {
        //call the addItems method from todo page to add tasks
        todopage.addItems(data.rows[i].tasksList);
      }

      cy.get("ul.todo-list").children()
      .should("have.length", 3)
    });
  });

  it("Edit todo items", () => {
    //Read tasks from the jason file
    cy.fixture("xlsxData").then(function (data) {
      for (let i = 0; i < rowsLength; i++) {
        todopage.addItems(data.rows[i].tasksList);
      }
    });
    //call editItems method to edit tasks
    todopage.editItems(" Edited");
    //verify the task is edited successfully
    cy.get(".todo-list").contains("Edited");
  });

  it("Complete todo items", () => {
    cy.fixture("xlsxData").then(function (data) {
      for (let i = 0; i < rowsLength; i++) {
        todopage.addItems(data.rows[i].tasksList);
      }
      //call completeItems method to complete tasks
      todopage.completeItems();

      //verify the completed task is removed  
      cy.get("ul.todo-list").children().should("have.length", 2)
    });
  });

  it("Filter incomplete items", () => {
    cy.fixture("xlsxData").then(function (data) {
      for (let i = 0; i < rowsLength; i++) {
        todopage.addItems(data.rows[i].tasksList);
      }
    });

    //call activeItems method to filter incomplete items tasks
    todopage.activeItems();

    //Verify completed item is not included in active tasks list
    cy.contains("Task 1").should("not.exist");
  });

  it("Delete Completed items", () => {
    cy.fixture("xlsxData").then(function (data) {
      for (let i = 0; i < rowsLength; i++) {
        todopage.addItems(data.rows[i].tasksList);
      }
    });

    todopage.completeItems();

    //call clearCompletedItems method to clear completed itemss
    todopage.clearCompletedItems();

    //Verify list is cleared successfully
    cy.contains("Clear completed").should("not.exist");
  });
});
