let currentPage = 0; 
const itemsPerPage = 5; 
let showDetailsOn = -1;

const getBook = (book) => {
    return `<div class="table-row">
            <div>${book.id}</div>
            <div><a href="#" onclick="showDetails(${book.id})">${book.title}</a></div>
            <div>$${book.price.toFixed(2)}</div>
            <div><button onclick="showDetails(${book.id})">read</button></div>
            <div><button onclick="updateBook(${book.id})">Update</button></div>
            <div><button onclick="deleteBook(${book.id})">delete</button></div>
            </div>`;

};

const getStarRating = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? 'filled' : ''}">&#9733;</span>`;
    }
    return stars;
};

const renderBookList = (books) => {
    const startIndex = currentPage * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage;

    const paginatedBooks = books.slice(startIndex, endIndex);

    document.getElementById("bookList").innerHTML = '';

    let htmlbooks = paginatedBooks.map((book) => getBook(book)).join("");
    document.getElementById("bookList").innerHTML += htmlbooks;
    paginationButtons(books.length);

    document.getElementById("prevBtn").disabled = currentPage === 0;
    document.getElementById("nextBtn").disabled = endIndex >= books.length;
};