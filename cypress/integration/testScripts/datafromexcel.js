import TodoPage from "../../pages/TodoPage";

const todopage = new TodoPage();

//File reading constants
const XLSX_FILE_NAME = "cypress/fixtures/excelData.xlsx";
const XLSX_SHEET_NAME = "Sheet1";
const JSON_DATA_FILE_NAME = "cypress/fixtures/xlsxData.json";
const XLSX_DATA_CONSTANT = "xlsxData";

let rowsLength;
describe("Read Tasks from Excel FIle", () => {
  before(() => {
    //Read data from excel file , covert and write it to a json file
    cy.task("readXlsx", {
      file: XLSX_FILE_NAME,
      sheet: XLSX_SHEET_NAME,
    }).then((rows) => {
      rowsLength = rows.length;
      cy.writeFile(JSON_DATA_FILE_NAME, {
        rows,
      });
    });
  });

  beforeEach(() => {
    //visit url every before each test case with a wait time of 2secs
    cy.wait(2000);
    todopage.visit();

    //Verify the webpage
    cy.title().should("include", "TodoMVC");
  });

  //Get sample items for test cases
  function getSampleItems(data) {
    for (let i = 0; i < rowsLength; i++) {
      //call the addItems method from todo page to add tasks
      todopage.addItems(data.rows[i].tasksList);
    }
  }

  it("Add Tasks to Todo List", function () {
    //Read tasks from the jason file
    cy.fixture(XLSX_DATA_CONSTANT).then(function (data) {
      getSampleItems(data);
      cy.get("ul.todo-list").children().should("have.length", 3);
    });
  });

  it("Edit Todo Items of the List", () => {
    //Read tasks from the jason file
    cy.fixture(XLSX_DATA_CONSTANT).then(function (data) {
      getSampleItems(data);
    });
    //call editItems method to edit tasks
    todopage.editItems(" Edited");
    //verify the task is edited successfully
    cy.get(".todo-list").contains("Edited");
  });

  it("Complete Todo Items", () => {
    cy.fixture(XLSX_DATA_CONSTANT).then(function (data) {
      getSampleItems(data);
      //call completeItems method to complete tasks
      todopage.completeItems();

      //verify the completed task is removed
      cy.get("ul.todo-list").children().should("have.length", 2);
    });
  });

  it("Filter Incomplete Items from the List", () => {
    cy.fixture(XLSX_DATA_CONSTANT).then(function (data) {
      getSampleItems(data);
    });

    //call activeItems method to filter incomplete items tasks
    todopage.activeItems();

    //Verify completed item is not included in active tasks list
    cy.contains("Task 1").should("not.exist");
  });

  it("Delete Completed Items from the List", () => {
    cy.fixture(XLSX_DATA_CONSTANT).then(function (data) {
      getSampleItems(data);
    });

    todopage.completeItems();

    //call clearCompletedItems method to clear completed itemss
    todopage.clearCompletedItems();

    //Verify list is cleared successfully
    cy.contains("Clear completed").should("not.exist");
  });
});
