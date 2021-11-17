let toDos = []
const addBtn = document.querySelector('.add_btn');

class ToDoManager {
    constructor() {
        this.item = this.createEle('li');
        this.checkBox = this.createEle('input');
        this.titleBox = this.createEle('p');
        this.delBtn = this.createEle('button');

        this.checkBox.type = 'checkbox';
        this.titleBox.classList.add('title');
        this.delBtn.classList.add('del_btn');
        this.delBtn.innerText = '❌';
        
        this.delBtn.addEventListener('click', this.deleteItem.bind(this));
        this.checkBox.addEventListener('click', this.changeStatus.bind(this));
    }
    createEle(tagName) {
        return document.createElement(tagName);
    }
    addItem(title) {
        const toDoList = document.querySelector('.todo_list');
        this.titleBox.innerText = title.text;
        this.item.id = title.id;
        const errorMsg = document.querySelector('.error_msg');
        if(this.titleBox.innerText === ''){
            errorMsg.classList.add('show');
            return
        }

        errorMsg.classList.remove('show');
        this.item.appendChild(this.checkBox);
        this.item.appendChild(this.titleBox);
        this.item.appendChild(this.delBtn);
        toDoList.appendChild(this.item);
        toDos.push(title)
        this.saveItem(toDos)
    }
    saveItem(toDo) {
        localStorage.setItem("todos", JSON.stringify(toDo))
    }
    deleteItem(event) {
        const deleteTarget = event.target.parentElement;
        deleteTarget.remove();
        toDos = toDos.filter((toDoItem) => toDoItem.id !== parseInt(deleteTarget.id))
        this.saveItem(toDos)
    }
    changeStatus(event) {
        const checkTarget = event.target;
        const targetParent = event.target.parentElement;
        let targetStatus = 'ing';
        if(checkTarget.checked === true){
            targetStatus = 'finish'
        }
        toDos.forEach((toDoItem) => {
            if(toDoItem.id === parseInt(targetParent.id)){
                toDoItem.status = targetStatus;
            }
        }) 
        this.saveItem(toDos)
    }
    checkStatus(status) {
        if(status === 'finish'){
            this.checkBox.click()
        }
    }
}

function addToDo(event) {
    event.preventDefault();
    const toDoAddInput = document.querySelector('.add_input');
    const toDoInputValue = toDoAddInput.value;
    const toDoObj = {
        text : toDoInputValue,
        id : Date.now(),
        status : 'ing'
    }
    toDoAddInput.value = '';
    const newTodo = new ToDoManager().addItem(toDoObj)
    return newTodo
}
function getLocalStorage() {
    const savedToDos = localStorage.getItem('todos');
    if(savedToDos){
        const parseToDos = JSON.parse(savedToDos);
        parseToDos.forEach(element => {
            const setTodo = new ToDoManager()
            setTodo.addItem(element)
            setTodo.checkStatus(element.status)
        });
    }
}
getLocalStorage();
addBtn.addEventListener('click', addToDo)
