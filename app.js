// Define UI  variables
const  form =  document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const  filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all  event listeners
loadEventListener()

// Load all event listeners
function loadEventListener(){

  // Load  all  event listeners
  document.addEventListener('DOMContentLoaded',getTasks)

//   Add task  event
  form.addEventListener('submit',addTask);
  // Remove task event
  taskList.addEventListener('click',removeTask)
  // Clear task event
  clearBtn.addEventListener('click',clearTasks)
  // Filter  task  event
  filter.addEventListener('keyup',filterTasks)

}

// get tasks  from  Local storage
 function getTasks(){
  let tasks=null
  if(localStorage.getItem('tasks')===null){
    tasks =[]
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){
    // create li element
    const li= document.createElement('li')
    // Add class
    li.className= 'collection-item'
    // create textNode and append to li
    li.appendChild(document.createTextNode(task))
    // create new link element
    const link = document.createElement('a')
    // Add class
    link.className='delete-item'
    // Add icon html
    link.innerHTML= '<img src="https://img.icons8.com/ios-glyphs/48/000000/delete-forever.png"/>'
    // Append the link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)
  })

 }

 


// Add Task
function addTask(e){
    if(taskInput.value===''){
        alert('ADD A TASK')
    }

    // create li element
    const li= document.createElement('li')
    // Add class
    li.className= 'collection-item'
    // create textNode and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // create new link element
    const link = document.createElement('a')
    // Add class
    link.className='delete-item'
    // Add icon html
    link.innerHTML= '<img src="https://img.icons8.com/ios-glyphs/48/000000/delete-forever.png"/>'
    // Append the link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)

    // store  in   local storage
    storeTaskInLocalStorage(taskInput.value)

    // clear input
    taskInput.value = ''
    


    e.preventDefault()
}

// store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null) {
      tasks = []
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
   
}

// Remove Task
     function removeTask(e){
      if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure'))
          e.target.parentElement.parentElement.remove()
          
    //  Remove  task  from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
      }
    
     }

    //  Remmove  from LS
    function removeTaskFromLocalStorage(taskItem){
      let tasks;
      if(localStorage.getItem('tasks')===null) {
        tasks = []
      }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
      }

      tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
          tasks.splice(index,1)
        }
      })

      localStorage.setItem('tasks',JSON.stringify(tasks))
    }


     
    //  clear Tasks
    function clearTasks(){
      taskList.innerHTML = ''

      // Clear from  local  storage
      clearTaskFromLocalStorage()
    }

    // clear tasks from Local Storage
    function clearTaskFromLocalStorage(){
      localStorage.clear()
    }

    // Filter Tasks
    function filterTasks(e){
       const text = e.target.value.toLowerCase()

       document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent
         if (item.toLocaleLowerCase().indexOf(text)!=-1) {
          task.style.display.className= '.collection-item'
         } else {
          task.style.display='none'
         }
            
        }
       )

     
    }
