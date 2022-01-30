// getting all required elements
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField Button');
const todoList = document.querySelector('.todoList');
const deleteAll = document.querySelector('.footer button')


 inputBox.onkeyup = ()=>{
     let userData = inputBox.value; // getting user entered value

     if(userData.trim() != 0){
         addBtn.classList.add('active') // active the button
     }
     else{
        addBtn.classList.remove('active') // dactive the button
     }
 }
 showTask()  // calling function task

//  if user click on add button
addBtn.onclick =()=>{
    let userData = inputBox.value; // getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo");  // getting local Storage
    if(getLocalStorage == null){ //if localStorage is null
        listArr =[];  //creating blank array 
    }
    else{
        listArr  =JSON.parse(getLocalStorage) // converting js string into a js object
    }

    listArr.push(userData) // adding user data

    localStorage.setItem("New Todo",JSON.stringify(listArr)) // converting js object into js string
    showTask()  // calling function task
}


// function  to add task in ul list
function showTask(){
    let getLocalStorage = localStorage.getItem('New Todo')  // getting local Storage
    if(getLocalStorage == null){
        listArr = [] // creating blank array
    }
    else{
        listArr  = JSON.parse(getLocalStorage) // converting js string into a js object
    }

    // showing how much task is pending
    const pending = document.querySelector('.pending-task-num')
    pending.textContent = listArr.length  // passing length of array in  list

    // if array length is greater then  0 
    if(listArr.length > 0){
        deleteAll.classList.add('active') // active the clearAll button
    }
    else{
        deleteAll.classList.remove('active')
    }

    let newLiTag = '';
    listArr.forEach((element, index)=>{
        newLiTag += `<li> ${element} <span onclick = " deleteTask(${index})"><fas class="fas fa-trash"></fas></span> </li>`
    })

    todoList.innerHTML = newLiTag  // adding new li tag inside ul
    inputBox.value = ""
}

// delete task
function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New Todo');
    listArr  = JSON.parse(getLocalStorage);
    listArr.splice(index, 1) // delete or remove the particular index

    // after remove the element again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); // converting js object into json
    showTask() // calling showtask function
}


// delete All task

deleteAll.onclick =()=>{
    listArr = []; // empty an array

    // after deleting all the task again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTask()
}