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
        const thisTodoList = this.getTodo();
        const zero = 0;
        const firstTodoId = 1;
        const itemId = thisTodoList.length === zero ? firstTodoId : thisTodoList[thisTodoList.length-1].id + 1;
        const todoInfo = new TodoInfo(title, date, itemId);
        thisTodoList.push(todoInfo);
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

class eventHandler {
    constructor() {
        this.isClicked = false;
        this.targetTodo = undefined;
        this.initialTodo = undefined;
        this.moveBox = document.querySelector('#move');
    }
    mouseDown(drag, event) {
        const target = event.target
        const targetTodo = event.target.closest('.list_item');
        if(!targetTodo) {
            return
        }
        const targetSelector = {
            title : targetTodo.querySelector('.item_tt'),
            date : targetTodo.querySelector('.item_due_date'),
            deleteBtn : targetTodo.querySelector('.del_btn'),
        }

        switch(target) {
            case targetSelector.title :
            case targetSelector.date :
            case targetSelector.deleteBtn :
                break;
            default : 
                drag.startDrag(drag, targetTodo, event);
        }
    }
    startDrag(drag, targetTodo, event) {
        const mouseMainBtn = 0;
        drag.isClicked = true;

        if(event.button !== mouseMainBtn){
            return
        }
    
        drag.targetTodo = targetTodo.cloneNode(true);
        drag.initialTodo = targetTodo;
        drag.initialTodo.classList.add('moving');
        
        
        if(drag.moveBox.childElementCount > 0) {
            drag.moveBox.replaceChild(drag.targetTodo, drag.moveBox.firstChild)
        }
        drag.moveBox.appendChild(drag.targetTodo)
    
        const { pageX, pageY } = event;
        drag.moveBox.style.left =  `${pageX - drag.moveBox.offsetWidth / 2}px`;
        drag.moveBox.style.top =  `${pageY - drag.moveBox.offsetHeight / 2}px`;
    }
    mouseMove(event) {
        if(!this.isClicked || !this.targetTodo) {
            return
        }
        
        const { pageX, pageY } = event;
        this.moveBox.hidden = true;
        const underPointer = document.elementFromPoint(pageX, pageY);
        const todoUnderPointer = underPointer.closest('li');
        const listUnderPointer = underPointer.closest('.todo_table');
        this.moveBox.hidden = false;

        this.moveBox.style.left =  `${pageX - this.moveBox.offsetWidth / 2}px`;
        this.moveBox.style.top =  `${pageY - this.moveBox.offsetHeight / 2}px`;

        if(!todoUnderPointer) {
            if(listUnderPointer) {
                const targetTodoList = listUnderPointer.querySelector('.todo_list_box');
                const {top} = targetTodoList.getBoundingClientRect();
                
                if(top >= pageY) {
                    targetTodoList.prepend(this.initialTodo);
                }else {
                    targetTodoList.appendChild(this.initialTodo);
                }
            }
            return
        }

        if(this.isBefore(this.initialTodo, todoUnderPointer)) {
            todoUnderPointer.parentNode.insertBefore(this.initialTodo, todoUnderPointer);
        }else if(todoUnderPointer.parentNode) {
            todoUnderPointer.parentNode.insertBefore(this.initialTodo, todoUnderPointer.nextSibling);
        }
    }
    isBefore(initialTodo, todoUnderPointer) {
        if(todoUnderPointer.parentNode === initialTodo.parentNode) {
            for(let current = initialTodo.previousSibling; current; current = current.previousSibling) {
                if(current === todoUnderPointer){
                    return true;
                }
            }
        }
        return false
    }
    mouseUp(drag, event) {
        if(drag.isClicked) {
            const moveId = drag.initialTodo.id;
            const moveStatus = drag.initialTodo.closest('.todo_table').id;
    
            drag.isClicked = false;
            if(drag.initialTodo) {
                drag.initialTodo.classList.remove('moving');
            }
            if(drag.targetTodo) {
                drag.targetTodo.remove();
            }
            
            drag.initialTodo = undefined;
            drag.targetTodo = undefined;
            
            this.model.changeStatus(moveId, moveStatus);
            this.getListCount();
            this.checkDate();
        }else {
            const target = event.target
            const targetTodo = event.target.closest('.list_item');
            if(!targetTodo) {
                return
            }
            const targetSelector = {
                title : targetTodo.querySelector('.item_tt'),
                date : targetTodo.querySelector('.item_due_date'),
                deleteBtn : targetTodo.querySelector('.del_btn'),
            }
            
            switch(target) {
                case targetSelector.title :
                    this.edit(targetTodo, target, 'title');
                    break;
                case targetSelector.date :
                    this.edit(targetTodo, target, 'date');
                    break;
                case targetSelector.deleteBtn :
                    this.deleteTodo(targetTodo);
                    break;
                default : 
                    return
            }
        }
    }
    mouseLeave(drag) {
        if(!drag.isClicked){
            return
        }
        drag.mouseUp.call(this, drag);
    }
}

class TodoContorller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.eventer = new eventHandler();
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
        const eventer = this.eventer;
        const body = document.querySelector('body');

        body.addEventListener('mousedown', eventer.mouseDown.bind(this, eventer));
        body.addEventListener('mousemove', eventer.mouseMove.bind(eventer));
        body.addEventListener('mouseup', eventer.mouseUp.bind(this, eventer));
        body.addEventListener('mouseleave', eventer.mouseLeave.bind(this, eventer));
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
    deleteTodo(todo) {
        this.model.deleteTodo(todo.id);
        this.updateView();
    }
    checkDate() {
        const dueDateList = document.querySelectorAll('.item_due_date');
        const today = this.getToday();
        dueDateList.forEach(date => {
            if(date.closest('#done')){
                date.classList.remove('finish');
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
        const offset = new Date().getTimezoneOffset() * 60000;
        const today = new Date(Date.now() - offset).toISOString().split('T')[0];
        return today
    }
}

const todoModel = new TodoModel;
const todoView = new TodoView;
const todoContorller = new TodoContorller(todoModel, todoView);