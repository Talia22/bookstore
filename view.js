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

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--; 
        renderBookList(books);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if ((currentPage + 1) * itemsPerPage < books.length) {
        currentPage++; 
        renderBookList(books);
    }
});

const paginationButtons = (length) => {
    const totalPages = Math.ceil(length / itemsPerPage);
    const paginationContainer = document.getElementById("paginationButtons");
    paginationContainer.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i + 1;
        pageButton.className = "pageBtn";
        pageButton.onclick = () => {
            currentPage = i;
            renderBookList(books);
        };
        paginationContainer.appendChild(pageButton);
    }
};


function showDetails(id) {
    const book = books.find(b => b.id === id);
    document.getElementById('detailTitle').innerText = book.title;
    document.getElementById('detailPrice').innerText = `$${book.price.toFixed(2)}`;
    document.getElementById('detailImage').src = book.link;
    document.getElementById('detailRating').innerText = book.rating; 
    showDetailsOn = id;
}


function updateBook(id) {
    const book = books.find(b => b.id === id);

    document.getElementById("bookId").value = book.id;
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("bookPrice").value = book.price;
    document.getElementById("bookRating").value = book.rating;
    document.getElementById("bookImage").value = book.link;

    document.getElementById("addBook").style.display = "block"; 

    document.getElementById("addBookForm").dataset.mode = "update";
    document.getElementById("addBookForm").dataset.id = id; 
}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);    
    renderBookList(books);

}

const resetFormFields = () => {
    document.getElementById("bookId").value = '';
    document.getElementById("bookTitle").value = '';
    document.getElementById("bookPrice").value = '';
    document.getElementById("bookRating").value = '';
    document.getElementById("bookImage").value = '';
};

document.getElementById("NewBook").addEventListener("click", () => {
    resetFormFields();  
    document.getElementById("addBook").style.display = "block"; 
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("addBook").style.display = "none"; 
});

window.addEventListener("click", (event) => {
    const modal = document.getElementById("addBook");
    if (event.target === modal) {
        modal.style.display = "none"; 
    }
});

document.getElementById("addBookForm").addEventListener("submit", (event) => {
    event.preventDefault(); 

    const mode = event.target.dataset.mode; 
    const bookId = event.target.dataset.id; 
    id = parseInt(document.getElementById("bookId").value);
    const newBook = {
        id: id,
        title: document.getElementById("bookTitle").value,
        price: parseFloat(document.getElementById("bookPrice").value),
        rating: parseInt(document.getElementById("bookRating").value),
        link: document.getElementById("bookImage").value,
    };

    if (mode === "update") {
        const index = books.findIndex(b => b.id === parseInt(bookId));
        if (index !== -1) {
            books[index] = newBook; 
        }
        if(id === showDetailsOn)
            showDetails(id)
        document.getElementById("addBookForm").dataset.mode = "new";
    } else {
        books.push(newBook);
        const totalPages = Math.ceil(books.length / itemsPerPage);
        currentPage = totalPages - 1; 
    }
    showDetails(id); 

    document.getElementById("addBook").style.display = "none"; 
    renderBookList(books);
});









