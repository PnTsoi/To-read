const mainContainer = document.querySelector(".main-container");
const main = mainContainer.querySelector("#main");
const bookContainer = main.querySelector(".container");

const nodeListCards = bookContainer.querySelectorAll(".card");

console.log(nodeListCards);

const side = mainContainer.querySelector("#side");
const statList = side.querySelector("ul.stat-list");
const createBookButton = statList.querySelector("button");
console.log(createBookButton);
createBookButton.addEventListener("click", createBook);

function bookObj(bookName, bookAuthor, bookPage, pageRead, bookStatus) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookPage = bookPage;
    this.pageRead = pageRead;
    this.bookStatus = bookStatus;
}

function createBook() {
     
}

