//defining relevant DOM elements
const tbody = document.querySelector(".library");
const addBookbtn = document.querySelector(".add-book-btn");
const titleInput = document.querySelector("#title-entry");
const authorInput = document.querySelector("#author-entry");
const pagesInput = document.querySelector("#pages-entry");
const readInput = document.querySelector("#read-entry");

addBookbtn.addEventListener("click", newBook);

//object constructor
class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = () => {
        let isRead = '';
        if(this.read){
            isRead = 'has been read.'
        } else {
            isRead = 'has not been read yet.'
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`
    };
};
//pushes Book objects to myLibrary for local storage later
function addBookToLibrary(book) {
    myLibrary.push(book);
};
//adds user input to display table and to local storage
function newBook(){
    const title = titleInput.value
    const author = authorInput.value
    let pages = parseInt(pagesInput.value);
    const read = readInput.checked
    if (title === '' || author === '' || pages === ''){
        alert("Please make sure ALL fields are filled out before adding a book");
        return;
    };
    if (isNaN(pages)){
        alert("Invalid Data-Type. Please enter the NUMBER of pages in the book.");
        pagesInput.value = ''
        return;
    } else if (pages > 1000000){
        alert("There is no way your book is more than a million pages... Please enter the real number of pages in the book");
        pagesInput.value = ''
        return;
    } else if (pages < 1){
        alert("There is no way your book has less than 1 page... Please enter the real number of pages in the book");
        pagesInput.value = ''
        return;
    };
    const book  = new Book(title, author, pages, read);

    addBookToLibrary(book);

    const row = document.createElement('tr');
    tbody.appendChild(row);
    
    for(property in book){
        if(typeof(book[property]) === 'string'|| typeof(book[property]) === 'number'){    
            const cell = document.createElement('td');
            row.appendChild(cell);
            cell.innerHTML = book[property];
        } else if (book[property] === true || book[property] === false){
            const cell = document.createElement('td');
            row.appendChild(cell);
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.value = book[property];
            cell.appendChild(checkbox);
            if (read) {
                checkbox.checked = "checked";
            }
            checkbox.addEventListener("click", function () {
                if(this.checked === true){
                    book.read = true;
                    console.log(book);
                } else {
                    book.read = false;
                    console.log(book);
                };
            })
        };
    };
    const cell = document.createElement('td');
    row.appendChild(cell);
    const rmButton = document.createElement('button');
    cell.appendChild(rmButton);
    rmButton.classList.add('rm-button');
    rmButton.addEventListener("click", deleteEntry);
    rmButton.innerHTML = 'REMOVE';

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readInput.checked = '';
    console.log(book.info());
    console.log(myLibrary);
    localStorage.setItem("library", JSON.stringify(myLibrary)); //put full library into local storage
};
//deletes specified entry from display table and local storage
function deleteEntry(){
    this.parentElement.parentElement.remove();
    for (book in myLibrary){
        if(myLibrary[book].title === this.parentElement.parentElement.firstChild.innerHTML){
            myLibrary.splice(book,1);
            localStorage.setItem("library", JSON.stringify(myLibrary));
        };
    };
};
//create initial table body from myLibrary (populated from local storage)
function createTable(){
    for(book in myLibrary){
        const currentBook = myLibrary[book];
        const row = document.createElement('tr');
        tbody.appendChild(row);
        for(property in currentBook){
            //create data cells for Title, Author and Number Fields
            if(typeof(currentBook[property]) === 'string'|| typeof(currentBook[property]) === 'number'){    
                const cell = document.createElement('td');
                row.appendChild(cell);
                cell.innerHTML = currentBook[property];
            //create checkbox for read property
            } else if (currentBook[property] === true || currentBook[property] === false){
                const cell = document.createElement('td');
                row.appendChild(cell);
                const checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.value = currentBook[property];
                if (currentBook[property] === true) checkbox.checked = "checked";
                checkbox.addEventListener("click", function () {
                    if(this.checked === true){
                        currentBook.read = true;
                    } else {
                        currentBook.read = false;
                    };
                })
                cell.appendChild(checkbox);
            };
        };
        const cell = document.createElement('td');
        row.appendChild(cell);
        //add button to remove entry
        const rmButton = document.createElement('button');
        rmButton.classList.add('rm-button');
        cell.appendChild(rmButton);
        rmButton.addEventListener("click", deleteEntry);
        rmButton.innerHTML = 'REMOVE';
    };
};

let myLibrary = JSON.parse(localStorage.getItem("library") || "[]"); //get library from local storage return empty array if no storage

createTable();





