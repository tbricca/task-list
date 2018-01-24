// Define UI Variables 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners 
loadEventListeners();

//Load all event listeners 
function loadEventListeners() {
    //Adding task event
    form.addEventListener('submit', addTask);
    // remove task event 
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
}
    /// Filter tasks event
    filter.addEventListener('keyup', filterTasks);

//Add Task 

function addTask(e) {
    if(taskInput.value === '') {
        //making sure that there is a task typed
        alert('Add a task');
    }

    // Create list item when adding (li element)
    const li = document.createElement('li');
    // Add class 
    // it is labeled collection so it will be themed like materialize 
    li.className = 'collection-item'
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    // this is for the delete button
    const link = document.createElement('a');
    // Add class 
    // you put secondary content for materialize so  it will put it to the right of the list item
    link.className = 'delete-item secondary-content';
    // Add icon html
    // fa remove is a X icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li 
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    ///// After adding item to the DOM -> Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);


    // Clear input 
    taskInput.value = '';
    
    console.log(li);

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        // PARSE it as JSON because local storage can only store strings 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task 
function remove(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
} 

// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '' -- easiest way 
    
    // FASTER way to do it 
    // while there is a first child in the list
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

// filter Tasks 
function filterTasks(e) {
    // put to lowercase so we can match it correctly 
    const text = e.target.value.toLowerCase();

    console.log(text);

    document.querySelectorAll('.collection-item').forEach()(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}