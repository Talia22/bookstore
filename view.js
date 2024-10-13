const getBook = (book) => {
    return `<div class="table-row-book">
            <div>${book.id}</div>
            <div><a href="#" onclick="showDetails(${book.id})">${book.title}</a></div>
            <div>$${book.price.toFixed(2)}</div>
            <div><button onclick="showDetails(${book.id})">read</button></div>
            <div><button onclick="updateBook(${book.id})">Update</button></div>
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
};