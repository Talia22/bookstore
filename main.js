document.addEventListener('DOMContentLoaded', () => {
    let booksLS = getObjFromLS("bookList");
    let currentPageLS = getObjFromLS("currentPage");
    let showDetailsOnLS = getObjFromLS("showDetailsOn");
    if (booksLS)
        books = booksLS;
    else 
    {
        books = Gbooks;
        saveObjToLS("bookList", books)
    }
    if (currentPageLS)
        currentPage = currentPageLS;
    else
    {
        currentPage = 0;
        saveObjToLS("currentPage", currentPage);
    }
    if (showDetailsOnLS)
    {
        showDetailsOn = showDetailsOnLS;
        showDetails(showDetailsOn)
    }
    else
    {
        showDetailsOn = -1;
        saveObjToLS("showDetailsOn", showDetailsOn);
        document.getElementById('noBook').style.display = 'block';
        document.getElementById('bookShowing').style.display = 'none';
    }
    renderBookList(books);
});
