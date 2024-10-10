document.addEventListener('DOMContentLoaded', () => {
    books = Gbooks; 
    renderBookList(books);
});

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
    document.getElementById('detailRating').innerHTML = getStarRating(book.rating);  
    showDetailsOn = id;
}

function updateBook(id) {
    const book = books.find(b => b.id === id);

    document.getElementById("bookId").value = book.id;
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("bookPrice").value = book.price;

    document.getElementById("bookRating").value = book.rating;
    setRating({ target: { getAttribute: () => book.rating } });

    document.getElementById("bookImage").value = book.link;

    document.getElementById("addBook").style.display = "block"; 

    document.getElementById("addBookForm").dataset.mode = "update";
    document.getElementById("addBookForm").dataset.id = id; 
    document.getElementById("addOrUpdate").innerText = "Update"; 

}

function deleteBook(id) {
    books = books.filter(book => book.id !== id);    
    renderBookList(books);

}

const resetFormFields = () => {
    document.getElementById("bookId").value = '';
    document.getElementById("bookTitle").value = '';
    document.getElementById("bookPrice").value = '';

    const stars = document.querySelectorAll('#ratingStars .star');
    stars.forEach(star => star.classList.remove('filled'));
    document.getElementById('bookRating').value = ''; 

    document.getElementById("bookImage").value = '';
    document.getElementById("addOrUpdate").innerText = "Add"; 

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

function setRating(event) {
    const stars = document.querySelectorAll('#ratingStars .star');
    const rating = event.target.getAttribute('data-value');
    
    document.getElementById('bookRating').value = rating;

    stars.forEach(star => {
        star.classList.remove('filled');
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('filled');
        }
    });
}

const sortBooksByPrice = (ascending = true) => {
    books.sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
    currentPage = 0;
    renderBookList(books);
};

document.getElementById("sortSelect").addEventListener("change", (event) => {
    const order = event.target.value;
    sortBooksByPrice(order === "asc");
});

const sortBooksByTitle = (ascending = true) => {
    books.sort((a, b) => ascending 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title)
    );
    currentPage = 0;
    renderBookList(books);
};

document.getElementById("sortTitleSelect").addEventListener("change", (event) => {
    const order = event.target.value;
    sortBooksByTitle(order === "asc");
});