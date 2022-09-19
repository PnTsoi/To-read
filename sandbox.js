// get DOM for all of the books available
const mainContainer = document.querySelector(".main-container");
const main = mainContainer.querySelector("#main");
const bookContainer = main.querySelector(".container");

const nodeListCards = bookContainer.querySelectorAll(".card");


// get book button and set up DOM query for side bar
const side = mainContainer.querySelector("#side");
const statList = side.querySelector("ul.stat-list");
const createBookButton = statList.querySelector("#form-open");

// set book array
let books = [];




//get DOM of popup-container
const popUpContainerNewBook = document.querySelector("#new-form");
const updatePopupForm = document.getElementById("update-form");

// add event listener to book button
createBookButton.addEventListener("click", () => {
    popUpContainerNewBook.style.display = "flex";
});

// get DOM of close popup button and set it to close if needed
const closeButton = document.querySelector("#newBookFormClose");
closeButton.addEventListener("click", () => {
    popUpContainerNewBook.style.display = "none";
});

const closeUpdateFormButton = document.getElementById("updateFormClose");
closeUpdateFormButton.addEventListener("click", () => {
    updatePopupForm.style.display = "none";
});

// get DOM of submit button and call the function to create book.
const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", (event) => {
    // get the book data submitted by the user
    event.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pageRead = document.getElementById('pages-read').value;
    let pageTotal = document.getElementById('pages-total').value;
    let readStatus = document.getElementById('read-status').value;
    // construct newBook obj and put it into the books array
    let newBook = new bookObj(title, author, pageRead, pageTotal, readStatus);
    books.push(newBook);
    storeData();
    render();
});

//constructor for book obj 
class bookObj{
    constructor(bookName, bookAuthor, bookPage, pageRead, bookStatus) {
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookPage = bookPage;
        this.pageRead = pageRead;
        this.bookStatus = bookStatus;
    }
}

// testing json stringify
// let oldBook = new bookObj("asdf", "SDFl", 12, 32, true);
// console.log(JSON.stringify(oldBook));
// for( var i = 0; i < 5; i++) {
//     books.push(oldBook);
// }
// console.log(JSON.stringify(books));


// create book after user click the new book button 
function createBook(book) {
    // close the popup form
    popUpContainerNewBook.style.display = "none";

    let card = document.createElement('div');
    card.classList.add('card');

    //add DOM for book title
    let cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    let h3cardTitle = document.createElement('h3');
    h3cardTitle.textContent = `${book.bookName}`; 
    cardTitle.appendChild(h3cardTitle);

    // set DOM for other elements of book
    let cardAuthor = document.createElement('p');
    let cardContainer = document.createElement('div');
    let cardPageRead = document.createElement('p');
    let updateButton = document.createElement('button');
    let removeButton = document.createElement('button');

    // Set updateButton
    updateButton.classList.add('update-card');
    updateButton.textContent = "Update book status";
    updateButton.addEventListener("click", () => {
        updatePopupForm.style.display = "flex";
        console.log(book);
        updateObj(book);
    });
    cardAuthor.textContent = `${book.bookAuthor}`;
    cardPageRead.textContent = `${book.pageRead}/${book.bookPage}`;
    cardContainer.classList.add('card-container');
    cardContainer.appendChild(cardPageRead);
    cardContainer.appendChild(updateButton);

    let cardReadStatus = document.createElement('div');
    if(book.bookStatus == "on") {
        cardReadStatus.classList.add('yes-status');
        cardReadStatus.textContent ="Finished";
    }
    else {
        cardReadStatus.classList.add('no-status');
        cardReadStatus.textContent ="Not Finished";
    }

    removeButton.id = "removeButton";
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", () => {
        books.splice(books.indexOf(book), 1);
        storeData();
        render();
    });

    cardContainer.appendChild(removeButton);
    card.appendChild(cardTitle);
    card.appendChild(cardAuthor);
    card.appendChild(cardContainer);
    card.appendChild(cardReadStatus);
    bookContainer.appendChild(card);

}

function updateObj(book) {
    const updateForm = document.getElementById('update-form');

    const updateButton = document.getElementById('updateSubmitButton');
    updateButton.addEventListener("click", () => {
        updateForm.style.display = 'none';
        let updatedTitle = document.getElementById('updateTitle').value; 
        let updatedAuthor = document.getElementById('updateAuthor').value; 
        let updatedPagesRead = document.getElementById('updatePagesRead').value; 
        let updatedPagesTotal = document.getElementById('updatePagesTotal').value; 
        let updatedBookStatus = document.getElementById('updateReadStatus').value; 

        var currentIndex = books.indexOf(book);
        books.splice(currentIndex, 1);
        books.push((new bookObj(updatedTitle, updatedAuthor, updatedPagesTotal, updatedPagesRead, updatedBookStatus)));

        storeData();
        render();
    });

}

function getData() {
    if(!localStorage.books) {
        render();
    }
    else {
        let data = localStorage.getItem("books");
        books = JSON.parse(data);
        render();
    }
}
function storeData() {
    localStorage.setItem(`books`, JSON.stringify(books));
}
function render() {
    while(bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    }

    for(let i = 0; i < books.length; i++) {
        createBook(books[i]);
    }

}

getData();