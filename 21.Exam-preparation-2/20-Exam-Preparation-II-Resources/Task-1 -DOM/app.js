window.addEventListener('load', solution);

function solution() {

  //initial element map

  let employeeElement = document.getElementById('employee');
  let categoryElement = document.getElementById('category');
  let urgencyElement = document.getElementById('urgency');
  let teamElement = document.getElementById('team');
  let descriptionElement = document.getElementById('description');

  let addButtonElement = document.getElementById('add-btn');

  let previewElement = document.querySelector('.preview-list');
  let pendingElement = document.querySelector('.pending-list');
  let resolvedElement = document.querySelector('.resolved-list');

  //Add event listener for [Add] button
  addButtonElement.addEventListener('click', onNext);

  function onNext(e) {
    e.preventDefault(); // премахва поведението по подразбиране на браузъра да се рефрешва след натискане на бутон
    //if some of the fields is empty should not allow submit
    if (employeeElement.value == "" ||
        categoryElement.value == "" ||
        urgencyElement.value == "" ||
        teamElement.value == "" ||
        descriptionElement.value == ""
    ){
      return;
    }


    //build elements to add into 'UL' for preview list
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'problem-content');

    let articleElement = document.createElement('article');

    let fromParagraph = document.createElement('p');
    fromParagraph.textContent = `From: ${employeeElement.value}`;

    let categoryParagraph = document.createElement('p');
    categoryParagraph.textContent = `Category: ${categoryElement.value}`;

    let urgencyParagraph = document.createElement('p');
    urgencyParagraph.textContent = `Urgency: ${urgencyElement.value}`;

    let asssignedToParagraph = document.createElement('p');
    asssignedToParagraph.textContent = `Assign to: ${teamElement.value}`;

    let descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = `Description: ${descriptionElement.value}`;

    let editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'edit-btn');
    editBtn.textContent = 'Edit';

    let continueButton = document.createElement('button');
    continueButton.setAttribute('class', 'continue-btn');
    continueButton.textContent = 'Continue';

    //append all paragraphs to 'article'
    articleElement.appendChild(fromParagraph);
    articleElement.appendChild(categoryParagraph);
    articleElement.appendChild(urgencyParagraph);
    articleElement.appendChild(asssignedToParagraph);
    articleElement.appendChild(descriptionParagraph);

    // append article and [Edit] and [Continue] buttons to 'li'
    liElement.appendChild(articleElement);
    liElement.appendChild(editBtn);
    liElement.appendChild(continueButton);

    // append 'li' to 'ul' previewElement
    previewElement.appendChild(liElement);


    //before removing the values from fields we should keep input data otherwise we will lose them
    let editedEmployee = employeeElement.value;
    let editedCategory = categoryElement.value;
    let editedUrgency = urgencyElement.value;
    let editedTeam = teamElement.value;
    let editedDescription = descriptionElement.value;

    //clear the input fields
    employeeElement.value = '';
    categoryElement.value = '';
    urgencyElement.value = '';
    teamElement.value = '';
    descriptionElement.value = '';
    
   
    addButtonElement.disabled = true;

    editBtn.addEventListener('click', onEdit);
    

    function onEdit(){
      employeeElement.value = editedEmployee;
      categoryElement.value = editedCategory;
      urgencyElement.value = editedUrgency;
      teamElement.value = editedTeam;
      descriptionElement.value = editedDescription;

      //remove 'li' element from DOM tree
      liElement.remove();
      addButtonElement.disabled = false;

    }

    //when click [Continue]
    continueButton.addEventListener('click', onContinue);

    function onContinue() {
      let liElementContinue = document.createElement('li');
      liElementContinue.setAttribute('class', 'problem-content');

      let articleElementContinue = document.createElement('article');
      articleElementContinue = articleElement;

      let resolvedButton = document.createElement('button');
      resolvedButton.setAttribute('class', 'resolve-btn');
      resolvedButton.textContent = 'Resolved'

      liElementContinue.appendChild(articleElement);
      liElementContinue.appendChild(resolvedButton);

      pendingElement.appendChild(liElementContinue);
      liElement.remove();

      addButtonElement.disabled = false;

      //on clicking resolve button
      resolvedButton.addEventListener('click', onResolve);
      function onResolve(){
        let liElementResolved = document.createElement('li');
        liElementResolved.setAttribute('class', 'problem-content');

        let articleElementResolved = document.createElement('article');
        articleElementResolved = articleElementContinue;

        let clearButton = document.createElement('button');
        clearButton.setAttribute('class', 'clear-btn');
        clearButton.textContent = 'Clear';

        liElementResolved.appendChild(articleElementResolved);
        liElementResolved.appendChild(clearButton);

        resolvedElement.appendChild(liElementResolved);

        liElementContinue.remove();

        //on clear button clicked
        clearButton.addEventListener('click', onClear);
        function onClear(){
          liElementResolved.remove();
        }

      }
      
    }


  }



  
}


    
    
