
// To run the tests in Playwright framework just install Playwright
// CLI# npm install 
// CLI# npx playwright install
// Then start the serverwith the command:
// CLI# npm start
// Then start the test by entering the command:
// CLI# npm test

const {test, expect} = require('@playwright/test');
  // Test 1 -
   // The purpose of this test is to ensure that the application
   // correctly adds a new task when a user types into the task input
   // and clicks the [Add Task] button
   // and verify if a user can add task

   // Test 1 - Verify if a user can add task
test('user can add task', async({page}) => {
   
    //Arrange
    await page.goto('http://localhost:5000');
    
    //Act - Create 
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Assert - checks that the text of the added task includes 'Test Task'. If it does, the test passes. If it doesn't, the test fails
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');
    
})

// Test 2: Verify if a user can delete a task
test('user can delete a task', async ({page}) => {

    //Arrange - Add task
    await page.goto('http://localhost:5000');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Act - Delete the task
    await page.click('.task .delete-task');

    //Assert 
    // Check that the text of the first task does not include 'Test Task'.
    // If the task was correctly deleted, its text should no longer be present
    // in the list, and the test should pass
    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');
})


// Test 3: Verify if a user can mark a task as completed
test('Verify if a user can mark a task as completed', async ({page}) => {
    //Arrange - Add task
    await page.goto('http://localhost:5000');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //Act - mark the task as completed
    await page.click('.task .task-complete');

    //Assert
    // Write a line that finds the first element with the class '.task.completed'.
    // If a task was marked as complete, it should have this class
    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull();
})

// Test 4: Test If a User Can Filter Tasks

test('Verify if a user can filter tasks', async ({page}) => {
      //Arrange - Add task
      await page.goto('http://localhost:5000/');
      await page.fill('#task-input', 'Test Task');
      await page.click('#add-task');
      //Mark the task as completed
      await page.click('.task .task-complete');

      //Act - Filter tasks 
      await page.selectOption('#filter', 'Completed');

      //Assert
      //check that incompleteTask is null. If the filter correctly shows only
      // completed tasks, incompleteTask should be null, and the test should pass
      const incompleteTask = await page.$('.task:not(.completed)');
      expect(incompleteTask).toBeNull(); 
})

// to runu tests enter in terminal: npx playwright test
