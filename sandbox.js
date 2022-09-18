// get DOM for all of the books available
const mainContainer = document.querySelector(".main-container");
const main = mainContainer.querySelector("#main");
const bookContainer = main.querySelector(".container");

const nodeListCards = bookContainer.querySelectorAll(".card");

console.log(nodeListCards);

// get book button and set up DOM query for side bar
const side = mainContainer.querySelector("#side");
const statList = side.querySelector("ul.stat-list");
const createBookButton = statList.querySelector("button");

// set book array
let books = [];


//get DOM of popup-container
const popUpContainer = document.querySelector("#popup-container");

// add event listener to book button
createBookButton.addEventListener("click", () => {
    popUpContainer.style.display = "flex"});

// get DOM of close popup button and set it to close if needed
const closeButton = document.querySelector("#form-close");
closeButton.addEventListener("click", () => {
    popUpContainer.style.display = "none";
});


// get DOM of submit button and call the function to create book.
const submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", () => {

    // get the book data submitted by the user
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pageRead = document.getElementById('pages-read').value;
    let pageTotal = document.getElementById('pages-total').value;
    let readStatus = document.getElementById('read-status').value;
    // construct newBook obj and put it into the books array
    let newBook = new bookObj(title, author, pageRead, pageTotal, readStatus);
    books.push(newBook);
    //call createBook to construct DOM
    createBook(newBook);
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
function createBook() {
    // close the popup form
    popUpContainer.style.display = "none";



    let card = document.createElement('div');
    card.classList.add('card');

    let cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    let h3cardTitle = document.createElement('h3');
    h3cardTitle.textContent = `${title}`; 
    cardTitle.appendChild(h3cardTitle);

    let cardAuthor = document.createElement('p');
    let cardContainer = document.createElement('div');
    let cardPageRead = document.createElement('p');
    let updateButton = document.createElement('button');

    updateButton.classList.add('update-card');
    updateButton.addEventListener("click", updateObj(newBook));
    cardAuthor.textContent = `${author}`;
    cardPageRead.textContent = `${pageRead}/${pageTotal}`;
    cardContainer.classList.add('card-container');
    cardContainer.appendChild(cardPageRead);
    cardContainer.appendChild(updateButton);

    let cardReadStatus = document.createElement('div');
    if(readStatus == true) {
        cardReadStatus.classList.add('yes-status');
        cardReadStatus.textContent ="Finished";
    }
    else {
        cardReadStatus.classList.add('no-status');
        cardReadStatus.textContent ="Not Finished";
    }
}

function updateObj(book) {
    
}


