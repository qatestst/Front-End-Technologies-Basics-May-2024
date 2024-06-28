window.addEventListener('load', solve);

function solve() {

//initial map elements

const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const placeElement = document.getElementById('place');
const eventElement = document.getElementById('event-name');
const emailElement = document.getElementById('email');

const addButtonElement = document.getElementById('add-btn');

const checkListElement = document.getElementById('check-list');
const upcomingListElement = document.getElementById('upcoming-list');
const finishedListElement = document.getElementById('finished-list');

let clearButtonElement = document.getElementById('clear')

//add event Listener fort Add event Button
addButtonElement.addEventListener("click", onNext);

function onNext(e){
    e.preventDefault();
    if(timeElement.value == '' ||
       dateElement.value == '' ||
       placeElement.value == '' ||
       eventElement.value == '' ||
       emailElement.value == ''
    ){
        return;
    }

    //building li element

    let liElement = document.createElement('li');
    liElement.setAttribute('class', "event-content");

    let articleElement = document.createElement('article');

    let timeParagraph = document.createElement('p');
    timeParagraph.textContent = `Begins: ${dateElement.value} at: ${timeElement.value}`

    let placeParagraph = document.createElement('p');
    placeParagraph.textContent = `In: ${placeElement.value}`;

    let eventParagraph = document.createElement('p');
    eventParagraph.textContent = `Event: ${eventElement.value}`;

    let emailParagraph = document.createElement('p');
    emailParagraph.textContent = `Contact: ${emailElement.value}`

    let editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'edit-btn');
    editBtn.textContent = 'Edit';

    let continueBtn = document.createElement('button');
    continueBtn.setAttribute('class', 'continue-btn');
    continueBtn.textContent = 'Continue';


    articleElement.appendChild(timeParagraph);
    articleElement.appendChild(placeParagraph);
    articleElement.appendChild(eventParagraph);
    articleElement.appendChild(emailParagraph);

    liElement.appendChild(articleElement);
    liElement.appendChild(editBtn);
    liElement.appendChild(continueBtn);
    
    checkListElement.appendChild(liElement);

    addButtonElement.disabled = true;


    //save data from elemnts before Edit

    let editedTimeElement = timeElement.value;
    let editedDataElement = dateElement.value;
    let editedPlaceElement = placeElement.value;
    let editedEventElement = eventElement.value;
    let editedEmailElement = emailElement.value;

    timeElement.value = '';
    dateElement.value = '';
    placeElement.value = '';
    eventElement.value = '';
    emailElement.value = '';   


    editBtn.addEventListener('click', onEdit);

    function onEdit(){
        timeElement.value = editedTimeElement;
        dateElement.value = editedDataElement;
        placeElement.value = editedPlaceElement;
        eventElement.value = editedEventElement;
        emailElement.value = editedEmailElement;

        liElement.remove();
        addButtonElement.disabled = false;

    }

    continueBtn.addEventListener('click', onContinue);

    function onContinue() {
        let liElementContinue = document.createElement('li');
        let articleElementContinue = document.createElement('article');
        articleElementContinue = articleElement;
        

        let moveToFinishedBtn = document.createElement('button');
        moveToFinishedBtn.setAttribute('class', 'finished-btn');
        moveToFinishedBtn.textContent = 'Move to Finished'
        
        
        liElementContinue.appendChild(articleElementContinue);
        liElementContinue.appendChild(moveToFinishedBtn);

        liElement.remove();

        upcomingListElement.appendChild(liElementContinue);

        moveToFinishedBtn.addEventListener('click', moveToFinished);
        moveToFinishedBtn.setAttribute('class', 'finished-btn');
        moveToFinishedBtn.textContent = 'Move to Finished';
        
        addButtonElement.disabled = false;

        function moveToFinished(){
            let liFinishedElement = document.createElement('li');
            liFinishedElement.setAttribute('class', 'event-content');

            let articleFinishedElement = document.createElement('article');
            articleFinishedElement = articleElementContinue;
    
            liFinishedElement.appendChild(articleFinishedElement);
            finishedListElement.appendChild(liFinishedElement);

            liElementContinue.remove();

            // add logic for clear button                               
            clearButtonElement.addEventListener('click', onClear);

            function onClear() {
                liFinishedElement.remove();
            }
                           
        }
    }
   }
}