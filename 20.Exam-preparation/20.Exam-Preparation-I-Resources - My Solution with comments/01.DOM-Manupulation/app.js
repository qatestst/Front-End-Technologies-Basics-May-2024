window.addEventListener("load", solve);

function solve() {

  // Get document Elements From Form Fields and store them in variables
let snowmanNameElement = document.getElementById('snowman-name');
let snowmanHeightElement = document.getElementById('snowman-height');
let snowmanLocationElement = document.getElementById('location');
let snowmanCreatorElement = document.getElementById('creator-name');
let snowmanAttributeElement = document.getElementById('special-attribute');

let addButtonElement = document.querySelector('.add-btn');

let snowmanPreviewList = document.querySelector('.snowman-preview');

let yourSnowmanList = document.querySelector('.snow-list');

let main = document.getElementById('hero');

let bodyElement = document.querySelector('.body');

let backImg = document.getElementById('back-img');

addButtonElement.addEventListener('click', addButtonFunction);

function addButtonFunction(e){
  //check valid data
  e.preventDefault();
  if(
      snowmanNameElement.value == "" ||
      snowmanHeightElement.value == "" ||
      snowmanLocationElement.value == "" ||
      snowmanCreatorElement.value == "" ||
      snowmanAttributeElement.value == ""
   ){
    return;
  };

    // create elements 'article' , 'li' and 'btnContainer' for Snowman Preview
    // add 'class' to 'li' and 'div' elements
    let articleSnowmanPreview = document.createElement('article');
    
    let liSnowmanInfoElement = document.createElement('li');
    liSnowmanInfoElement.setAttribute('class', 'snowman-info');
    
    let buttonsContainerSnowmanPreview = document.createElement('div');
    buttonsContainerSnowmanPreview.setAttribute('class', 'btn-container')

    
    // create paragraphs
    let snowmanNameParagraph = document.createElement('p');
    let snowmanHeightParagraph = document.createElement('p');
    let snowmanLocationParagraph = document.createElement('p');
    let snowmanCreatorParagraph = document.createElement('p');
    let snowmanAttributeParagraph = document.createElement('p');
    
    // add text content to paragraphs
    snowmanNameParagraph.textContent = `Name: ${snowmanNameElement.value}`;
    snowmanHeightParagraph.textContent = `Height: ${snowmanHeightElement.value}`;
    snowmanLocationParagraph.textContent = `Location: ${snowmanLocationElement.value}`;
    snowmanCreatorParagraph.textContent = `Creator: ${snowmanCreatorElement.value}`;
    snowmanAttributeParagraph.textContent = `Attribute: ${snowmanAttributeElement.value}`;

    // [Edit] and [Next] buttons
    //create Buttons 'Edit' and 'Next'
    let editButton = document.createElement('button');
    let nextButton = document.createElement('button');
    //add class to Buttons 'Edit' and 'Next' using command 'document.setAttribute()'
    editButton.setAttribute('class', 'edit-button');
    nextButton.setAttribute('class', 'next-button');
    //add text content to 'Edit' and 'Next' buttons
    editButton.textContent = 'Edit';
    nextButton.textContent = 'Next';

    //append created paragraphs to created article element 'articleSnowmanPreview'
    articleSnowmanPreview.appendChild(snowmanNameParagraph);
    articleSnowmanPreview.appendChild(snowmanHeightParagraph);
    articleSnowmanPreview.appendChild(snowmanLocationParagraph);
    articleSnowmanPreview.appendChild(snowmanCreatorParagraph);
    articleSnowmanPreview.appendChild(snowmanAttributeParagraph);

    buttonsContainerSnowmanPreview.appendChild(editButton);
    buttonsContainerSnowmanPreview.appendChild(nextButton);

    // add 'article' and 'buttonsContainer' to 'li'
    liSnowmanInfoElement.appendChild(articleSnowmanPreview);
    liSnowmanInfoElement.appendChild(buttonsContainerSnowmanPreview);

    //add 'liSnowmanInfoElement' to 'snowmanPreviewList'
    snowmanPreviewList.appendChild(liSnowmanInfoElement); 


    //store the info for Snowman before clearing the form - info
    let editedSnowmanName = snowmanNameElement.value;
    let editedSnowmanHeight = snowmanHeightElement.value;
    let editedSnowmanLocation = snowmanLocationElement.value;
    let editedSnowmanCreator = snowmanCreatorElement.value;
    let editedSnowmanAttribute = snowmanAttributeElement.value;

    // clear the snowman info in [Add Form]
    snowmanNameElement.value = "";
    snowmanHeightElement.value = "";
    snowmanLocationElement.value = "";
    snowmanCreatorElement.value = "";
    snowmanAttributeElement.value = "";

    // disable [Add] button
    addButtonElement.disabled = true;
    
    //Add [Edit] button functionality
    editButton.addEventListener("click", editFunction);

    function editFunction(){
        // Add data for Snowman infor form
        snowmanNameElement.value = editedSnowmanName;
        snowmanHeightElement.value = editedSnowmanHeight;
        snowmanLocationElement.value = editedSnowmanLocation;
        snowmanCreatorElement.value = editedSnowmanCreator;
        snowmanAttributeElement.value = editedSnowmanAttribute;

        // Clear Snowman Preview Data
        liSnowmanInfoElement.remove();
        // Activate [Add] button
        addButtonElement.disabled = false;
    };

    nextButton.addEventListener("click", nextButtonFunction);
    
    function nextButtonFunction(){
      // create 'li' elements for 'Your snowman' and set 'class'
      let liElementYourSnowman = document.createElement('li');
      liElementYourSnowman.setAttribute('class', 'snowman-content');

      // create article for 'Your Snowman' and get data from articleSnowmanPreview
      let articleElementYourSnowman = document.createElement('article');
      
      //get data from 'articleSnowmanPreview' - the data for Name, Height, Location, Creator, Attribute
      articleElementYourSnowman = articleSnowmanPreview;

      // Append 'articleElementYourSnowman' as a child to 'liElementYourSnowman'
      liElementYourSnowman.appendChild(articleElementYourSnowman);

      // Append 'liElementYourSnowman' as a child to 'yourSnowmanList' to show data on the webpage
      yourSnowmanList.appendChild(liElementYourSnowman);
      
      //Then remove [Edit] and [Next] buttons from 'Snowman Preview'
      buttonsContainerSnowmanPreview.remove();

      // create [Send] button in 'Your Snowman'
      let sendButton = document.createElement('button');
      sendButton.setAttribute("class", "send-btn");
      sendButton.textContent = 'Send';

      //append [Send] button to 'articleElementYourSnowman'
      articleElementYourSnowman.appendChild(sendButton);

      // add eventListener to [Send] button
      sendButton.addEventListener('click', sendButtonFunction);

      function sendButtonFunction() {
        // remove 'main' document element - this removes all elements on webpage
        main.remove();
        
        //Create [Back] button - on click reload webpage
        let backButton = document.createElement('button');
        backButton.setAttribute('class', 'back-button');
        backButton.textContent = 'Back';

        // make back image visible
        backImg.hidden = false;

        // append [Back] button to body dosument element to make button visible
        bodyElement.appendChild(backButton);

        // add eventListener to [Back] button
        backButton.addEventListener('click', backButtonFunction);

        function backButtonFunction() {
          window.location.reload();
        }

      }





     
      
      
      
     



    }

}






  

}