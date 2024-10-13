const getBook = (book) => {
    return `<div class="table-row-book">
            <div>${book.id}</div>
            <div><a href="#" onclick="renderBookDetails(${book.id})">${book.title}</a></div>
            <div>$${book.price.toFixed(2)}</div>
            <div><button onclick="renderBookDetails(${book.id})" data-translate="readButton">read</button></div>
            <div><button onclick="updateBook(${book.id})"data-translate="updateButton">update</button></div>
            <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" class="delete-icon" onclick="deleteBook(${book.id})" >
            </div>`;
};

const renderBookList = (books) => {
    if (currentPage * itemsPerPage > books.length -1) {
        currentPage --;
        saveObjToLS("currentPage", currentPage);
    }

    const startIndex = currentPage * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage;

    const paginatedBooks = books.slice(startIndex, endIndex);

    document.getElementById("bookList").innerHTML = '';

    let htmlbooks = paginatedBooks.map((book) => getBook(book)).join("");
    document.getElementById("bookList").innerHTML += htmlbooks;
    paginationButtons(books.length);

    document.getElementById("prevBtn").disabled = currentPage === 0;
    document.getElementById("nextBtn").disabled = endIndex >= books.length;
    updateLanguage(lang);
};

function renderBookDetails(id) {
    const book = getBookById(id);
    const noBookMessage = document.getElementById('noBook');
    const bookDetail = document.getElementById('bookShowing');
    if(!book) {
        noBookMessage.style.display = 'block';
        bookDetail.style.display = 'none'; 
        return;  
    }

    noBookMessage.style.display = 'none';

    document.getElementById('detailTitle').innerText = book.title;
    document.getElementById('detailPrice').innerText = `$${book.price.toFixed(2)}`;
    document.getElementById('detailImage').src = book.link;
    document.getElementById('detailRating').innerHTML = getStarRating(book.rating);  
    bookDetail.style.display = 'block'; 

    showDetailsOn = id;
    saveObjToLS("showDetailsOn", showDetailsOn);
}