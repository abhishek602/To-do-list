//select the Elements

const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
var list = document.getElementById('list');
const input = document.getElementById('input');


// classes names

const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const line_through = 'lineThrough';

//variable

let LIST, id ;

//get data  from localstorage
let item =  localStorage.getItem('TODO');

// check if data is not empty
// console.log(data)

if (item) {
    LIST = JSON.parse(item);
    id = LIST.length; // set the id to the last one
    loadList(LIST); // load the list to the user interface
} else {
    
    // if data is empty
    LIST = [];
    id = 0;

}

// load item to the userinterface

function loadList(arr) {
    arr.forEach(element => {
        addToDo(element.name,element.id,element.done,element.trash)
    });
}

//clear the local storage
clear.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
})


// Show todays date

const options = { weekday: 'long', month: 'short', day: 'numeric' }
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);


// add to do fucntion

function addToDo(todo,id,done,trash) {
   
    let div = document.createElement("div");


    if (trash) { return; }
    
    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";

    let item = `<li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE} ">${todo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>`;
    div.innerHTML = item;

    list.insertAdjacentElement('beforeend', div);

}

//add an item in the list when user press the enter key


document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
       
        const toDo = input.value;
        // console.log(toDo);

        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // code need everywhere
            localStorage.setItem('TODO', JSON.stringify(LIST));

            id++;
        }
        input.value = '';
   } 
});


//complete to do 
function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove to do

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener('click', function (event) {
    const element = event.target;     // returns the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob === 'complete') {
        completeToDo(element);

    } else if (elementJob === 'delete') {
        removeToDo(element);
    }
    // code need everywhere
    localStorage.setItem('TODO', JSON.stringify(LIST));


});


