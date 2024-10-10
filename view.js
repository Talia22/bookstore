const getBook = (book) => {
    return `<div class="table-row">
            <div>${book.id}</div>
            <div><a href="#" onclick="showDetails(${book.id})">${book.title}</a></div>
            <div>$${book.price.toFixed(2)}</div>
            <div><button onclick="showDetails(${book.id})">read</button></div>
            <div><button onclick="updateBook(${book.id})">Update</button></div>
            <div><button onclick="updateBook(${book.id})">delete</button></div>
            </div>`;

};

const renderBookList = (books) => {
    let htmlbooks = books.map((book) => getBook(book)).join("");
    document.getElementById("bookList").innerHTML += htmlbooks;
};


function showDetails(id) {
    const book = books.find(b => b.id === id);
    document.getElementById('detailTitle').innerText = book.title;
    document.getElementById('detailPrice').innerText = `$${book.price.toFixed(2)}`;
    document.getElementById('detailImage').src = book.link;
    document.getElementById('detailRating').innerText = '7'; 
}

function updateBook(id) {
    alert("hello");
}