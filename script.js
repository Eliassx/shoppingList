const form = document.getElementById('form');
const itemInput = document.getElementById('newItem');
const submitBtn = document.querySelector('.submitBtn');
const listItem = document.querySelector('.listItem');

let editItem;
let editFlag = false;
let editID = "";

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = new Date().getTime().toString();
    
    if(itemInput.value !== "" && editFlag === false) {
        const attr = document.createAttribute('data-id');
        attr.value = id;

        const item = document.createElement('article');
        item.classList.add('item');
        item.setAttributeNode(attr);
        item.innerHTML = 
        `
            <p class="itemName">${itemInput.value}</p>

            <div class="buttonsItem">
                <button type="button" class="editBtn btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="deleteBtn btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `
        listItem.appendChild(item);
        addLocalStorage(id, itemInput.value);
        defaultForm();

        const editBtn = item.querySelector('.editBtn');
        editBtn.addEventListener('click', (e) => {
            const item = e.currentTarget.parentElement.parentElement;
            editItem = e.currentTarget.parentElement.previousElementSibling

            itemInput.value = editItem.innerHTML;
            editFlag = true;
            editID = item.dataset.id;

            submitBtn.textContent = "Editar";
        });

        const deleteBtn = item.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', (e) => {
            const item = e.currentTarget.parentElement.parentElement;
            const id = item.dataset.id

            listItem.removeChild(item);
            deleteLocalStorage(id)
            defaultForm();

        });

    }
    else if(itemInput.value !== "" && editFlag === true) {
        editItem.innerHTML = itemInput.value

        updateLocalStorage(editID, itemInput.value);
        defaultForm();
    }   

    else{
        alert("Insira um item!");
    }

});

function defaultForm() {
    itemInput.value = "";
    let editFlag = false;
    let editID = "";
    submitBtn.textContent = "Adiconar";
};

function addLocalStorage(id, value) {
    const itemInput = { id, value }
    let items = getLocalStorage();

    items.push(itemInput);
    localStorage.setItem('list', JSON.stringify(items));
};

function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
};

function updateLocalStorage(id, value) {
    let items = getLocalStorage();

    items = items.map((item) => {
        if(item.id === id) {
            item.value = value
        };

        return item;
    });

    localStorage.setItem('list', JSON.stringify(items));
};

function deleteLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter((item) => {
        if(item.id !== id) {
            return item
        }
    });
    
    localStorage.setItem('list', JSON.stringify(items   ))
};