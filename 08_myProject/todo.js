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
    }
    getTodo() {
        return this.todoList;
    }
    addTodo(title, date) {
        const itemId = this.todoList.length === 0 ? 1 : this.todoList[this.todoList.length-1].id + 1;
        const todoInfo = new TodoInfo(title, date, itemId);
        this.todoList.push(todoInfo);
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
        this.view.updateTodo(this.model.getTodo());
        this.getListCount();
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
}

const todoModel = new TodoModel;
const todoView = new TodoView;
const todoContorller = new TodoContorller(todoModel, todoView);