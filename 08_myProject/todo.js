class TodoInfo {
    constructor(title, date, id) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.status = "todo";
    }
}

class TodoModel {
    constructor() {
        this.todoList = [];
        this.REPOSITORY_NAME = 'todos';
        this.getRepository();
    }
    getTodo() {
        return this.todoList;
    }
    addTodo(title, date) {
        const itemId = this.todoList.length === 0 ? 1 : this.todoList[this.todoList.length-1].id + 1;
        const todoInfo = new TodoInfo(title, date, itemId);
        this.todoList.push(todoInfo);
        this.setRepository();
    }
    editTodo(todoId, editKind, editValue) {
        this.todoList.forEach(todo => {
            if(todo.id === JSON.parse(todoId)) {
                todo[editKind] = editValue
            }
        })
        this.setRepository();
    }
    changeStatus(todoId, status) {
        this.todoList.forEach(todo => {
            if(todo.id === JSON.parse(todoId)) {
                todo.status = status
            }
        })
        this.setRepository();
    }
    deleteTodo(todoId) {
        this.todoList = this.todoList.filter(todo => {
            if(todo.id !== JSON.parse(todoId)) {
                return todo
            }
        })
        this.setRepository();
    }
    setRepository() {
        localStorage.setItem(this.REPOSITORY_NAME, JSON.stringify(this.todoList))
    }
    getRepository() {
        const currentStorage = JSON.parse(localStorage.getItem(this.REPOSITORY_NAME));
        if(currentStorage !== null){
            this.todoList = currentStorage
        } 
    }
}

class TodoView {
    constructor() {
        this.errorMsg = document.querySelector('.error_msg');
    }

    reset() {
        const todoLists = document.querySelectorAll('.todo_list_box');
        todoLists.forEach(list => {
            while(list.hasChildNodes()){
                list.removeChild(list.firstChild);
            }
        })
    }
    updateTodo(todo) {
        this.errorMsg.classList.remove('show');
        this.reset();
        
        todo.forEach(item => {
            const itemStatus = item.status;
            const elementTag = `
                <li id="${item.id}" class="list_item">
                    <div class="text_box">
                        <div class="item_tt_box">
                            <h3 class="item_tt">${item.title}</h3>
                            <input type="text" value="${item.title}" class="edit_tt hide">
                        </div>
                        <div class="item_date_box">
                            <p class="item_due_date">${item.date}</p>
                            <input type="date" value="${item.date}" class="edit_date hide">
                        </div>
                    </div>
                    <div class="btn_box">
                        <div class="move_box">
                            <button type="button" class="move_btn">Move</button>
                            <ul class="move_list">
                                <li><button type="button">todo</button></li>
                                <li><button type="button">doing</button></li>
                                <li><button type="button">done</button></li>
                            </ul>
                        </div>
                        <button type="button" class="del_btn">Delete</button>
                    </div>
                </li>
            `;
            document.querySelector(`#${itemStatus} .todo_list_box`).insertAdjacentHTML('beforeend', elementTag);
        });
    }
    updateCount(counts) {
        const todoTables = document.querySelectorAll('.todo_table');
        todoTables.forEach((table, index) => {
            const num = table.querySelector('.tt_box .num');
            num.innerText = counts[index];
        })
    }
    showError() {
        this.errorMsg.classList.add('show');
    }
}


class TodoContorller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }
    init() {
        const addBtn = document.querySelector('.add_btn');
        addBtn.addEventListener('click', this.creatModel.bind(this));

        document.querySelector('.input_date').setAttribute('min', this.getToday());
        this.updateView();
    }
    creatModel() {
        const todoInput = document.querySelector('.input_ttl');
        const todoDateInput = document.querySelector('.input_date');
        const todoTitle = todoInput.value;
        const todoDueDate = todoDateInput.value;
        if(todoTitle === '' || todoDueDate === ''){
            this.view.showError();
            return
        }
        todoInput.value = '';
        todoDateInput.value = '';

        this.model.addTodo(todoTitle, todoDueDate);
        this.updateView();
    }
    updateView() {
        this.view.updateTodo(this.model.getTodo());
        this.getListCount();
        this.checkDate();
        this.todoEventHandler();
    }
    getListCount() {
        let countNums = [];
        const todoLists = document.querySelectorAll('.todo_list_box');
        todoLists.forEach(list => {
            countNums.push(list.children.length)
        })
        this.view.updateCount(countNums);
    }
    todoEventHandler() {
        const todoItem = document.querySelectorAll('.list_item');
        todoItem.forEach(todo => {
            todo.addEventListener('click',function(event) {
                const target = event.target;
                const currentTarget = event.currentTarget;
                const targetSelector = {
                    title : currentTarget.querySelector('.item_tt'),
                    date : currentTarget.querySelector('.item_due_date'),
                    moveBtn : currentTarget.querySelector('.move_btn'),
                    deleteBtn : currentTarget.querySelector('.del_btn'),
                }
                switch(target) {
                    case targetSelector.title :
                        this.edit(currentTarget, target, 'title');
                        break;
                    case targetSelector.date :
                        this.edit(currentTarget, target, 'date');
                        break;
                    case targetSelector.moveBtn :
                        this.showMoveList(currentTarget);
                        break;
                    case targetSelector.deleteBtn :
                        this.deleteTodo(currentTarget);
                        break;
                }
            }.bind(this))
        })
    }
    edit(item, target, editKind) {
        const todoTarget = item.id;
        const editTarget = target.nextElementSibling;
        target.classList.add('hide');
        editTarget.classList.remove('hide');
        editTarget.focus();

        editTarget.addEventListener('blur', function() {
            const editValue = editTarget.value;
            this.model.editTodo(todoTarget, editKind, editValue)
            target.innerText = editValue;
            editTarget.classList.add('hide');
            target.classList.remove('hide');

            this.checkDate();
        }.bind(this))
    }
    showMoveList(item) {
        const moveLists = item.querySelector('.move_list');
        const moveListsItem = moveLists.querySelectorAll('li');
        const currnetList = item.closest('.todo_table').id
        moveLists.classList.toggle('show');
        moveListsItem.forEach(item => {
            if(item.innerText === currnetList) {
                item.classList.add('hide');
            }
            item.addEventListener('click', this.moveTodo.bind(this))
        })
    }
    moveTodo(event) {
        const target = event.target;
        const todoItem = target.closest('.list_item').id;
        
        this.model.changeStatus(todoItem, target.innerText);
        this.updateView();
    }
    deleteTodo(todo) {
        this.model.deleteTodo(todo.id);
        this.updateView();
    }
    checkDate() {
        const dueDateList = document.querySelectorAll('.item_due_date');
        const today = this.getToday();
        dueDateList.forEach(date => {
            if(date.closest('#done')){
                return
            }
            if(today >= date.innerText) {
                date.classList.add('finish');
            }else {
                date.classList.remove('finish');
            }
        })
    }
    getToday() {
        const today = new Date().toISOString().split('T')[0];
        return today
    }
}

const todoModel = new TodoModel;
const todoView = new TodoView;
const todoContorller = new TodoContorller(todoModel, todoView);