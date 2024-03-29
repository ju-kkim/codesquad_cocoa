class TodoView {
    constructor() {
        this.model = new TodoModel(this);        
    }
    print(todo) {
        const toDoList = document.querySelector('.todo_list')
        toDoList.appendChild(todo);
    }
}

class TodoModel {
    constructor(view) {
        this.view = view;
        this.REPOSITORY_NAME = 'todos';
        this.storageList = [];
        this.init();
    }
    init() {
        this.getRepository();
        const addBtn = document.querySelector('.add_btn');
        addBtn.addEventListener('click', this.creatTodo.bind(this));
    }
    setRepository() {
        localStorage.setItem(this.REPOSITORY_NAME, JSON.stringify(this.storageList))
    }
    getRepository() {
        const currentStorage = JSON.parse(localStorage.getItem(this.REPOSITORY_NAME));
        if(currentStorage !== null){
            this.storageList = currentStorage
            currentStorage.forEach(item => {
                this.createEle(item)
                this.checkStatus(item.status)
            });
        } 
    }
    updateRepository(type, target, updateContent) {
        const currentStorage = JSON.parse(localStorage.getItem(this.REPOSITORY_NAME));
        switch(type) {
            case 'delete' :
                const updateStorage = currentStorage.filter(({id}) => id !== JSON.parse(target))
                this.storageList = updateStorage;
                break
            case 'status' :
                currentStorage.forEach(item => {
                    if(item.id === JSON.parse(target)){
                        item.status = updateContent
                    }
                })
                this.storageList = currentStorage;
                break
            case 'edit' :
                currentStorage.forEach(item => {
                    if(item.id === JSON.parse(target)){
                        item.title = updateContent
                    }
                })
                this.storageList = currentStorage;
                break
        }
        this.setRepository();
    }
    createEle(todoInfo) {
        this.item = document.createElement('li');
        this.check = document.createElement('input');
        this.title = document.createElement('p');
        this.editInput = document.createElement('input');
        this.editBtn = document.createElement('button');
        this.deleteBtn = document.createElement('button');
        this.item.id = todoInfo.id;
        this.check.type = 'checkbox';
        this.title.classList.add('title');
        this.title.innerText = todoInfo.title;
        this.editInput.classList.add('edit_input');
        this.editInput.type = 'text';
        this.editBtn.classList.add('edit_btn');
        this.editBtn.innerText = 'edit'
        this.deleteBtn.classList.add('del_btn');
        this.deleteBtn.innerText = '❌';

        this.item.append(this.check, this.title, this.editInput, this.editBtn, this.deleteBtn);
        this.view.print(this.item)

        this.deleteBtn.addEventListener('click', this.deleteTodo.bind(this))
        this.check.addEventListener('click', this.changeStatus.bind(this))
        this.editBtn.addEventListener('click', this.editTitle.bind(this))
    }
    creatTodo(e) {
        e.preventDefault();
        const errorMsg = document.querySelector('.error_msg');
        const input = document.querySelector('.add_input');
        const inputTodo = input.value;
        if(inputTodo === ''){
            errorMsg.classList.add('show');
            return
        }
        errorMsg.classList.remove('show');
        input.value = '';
        const newTodo = {
            title : inputTodo,
            id : Date.now(),
            status : 'ing'
        }
        this.storageList.push(newTodo)
        this.setRepository()
        this.createEle(newTodo);
    }
    deleteTodo(e) {
        e.preventDefault();
        const targetTodo = e.target.parentElement;
        targetTodo.remove();
        this.updateRepository('delete' , targetTodo.id)
    }
    changeStatus(e) {
        const target = e.target;
        const targetItem = target.parentElement.id;
        let status = 'ing';
        target.checked === true ? status = 'finish' : status = 'ing';
        this.updateRepository('status' , targetItem , status)
    }
    checkStatus(status) {
        status === 'finish' ? this.check.click() : false
    }
    editTitle(e) {
        e.preventDefault();
        const target = e.target.parentElement;
        const todoTitle = target.querySelector('.title');
        const editInput = target.querySelector('.edit_input');
        const curTitle = todoTitle.innerText;
        target.classList.toggle('edit');
        if(e.target.innerText === 'edit'){
            e.target.innerText = 'save';
            editInput.value = curTitle;
            editInput.focus();
            return
        }else {
            e.target.innerText = 'edit';
            todoTitle.innerText = editInput.value;
            this.updateRepository('edit', target.id, editInput.value);
        }
    }
}

function startTodo(){
    const view = new TodoView();
}
startTodo();