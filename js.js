let books = [
  //   {
  //     bookId: "8342",
  //     author: "Andy Weir",
  //     category: "sci-fi",
  //     title: "The Martian",
  //     available: "available",
  //   },
  //   {
  //     bookId: "1928",
  //     author: "J.R.R. Tolkien",
  //     category: "fantasy",
  //     title: "The Fellowship of the Ring",
  //     available: "issued",
  //   },
  //   {
  //     bookId: "574",
  //     author: "James Clear",
  //     category: "self-help",
  //     title: "Atomic Habits",
  //     available: "available",
  //   },
  //   {
  //     bookId: "9102",
  //     author: "Alan Moore",
  //     category: "comic",
  //     title: "Watchmen",
  //     available: "available",
  //   },
  //   {
  //     bookId: "4431",
  //     author: "Yuval Noah Harari",
  //     category: "history",
  //     title: "Sapiens: A Brief History of Humankind",
  //     available: "issued",
  //   },
]
  
// localStorage.setItem("books", JSON.stringify(books));
let loStor = JSON.parse(localStorage.getItem("books"));
if (loStor != null) {
  books = loStor;
}
let filterdBooks = [];
function filterBooks(cate) {
  filterdBooks = books.filter((book) => book.category.toLowerCase() == cate);
  showBooks();
}
function showBooks(key = "") {
  $(".cards").empty();
  let searchList = [];
  if (filterdBooks.length) {
    searchList = filterdBooks;
  } else {
    searchList = books;
  }
  searchList.forEach((book) => {
    const card = `<div class="card p-3 mx-auto my-3 shadow-sm" style="width: 300px; height: 300px;">
    <div class="d-flex justify-content-between border-bottom pb-2 mb-3">
        <p class="mb-0 text-truncate " style="width:80%"><strong class="title">${book.title} </strong></p>
      ${book.available == "available" ? `<p class="mb-0 text-success available">${book.available}</p>` : `<p class="mb-0 text-danger available">${book.available}</p>`}  
    </div>
    <div class="details">
        <p class="mb-1">BookId : <strong class="bookId ">${book.bookId}</strong></p>
        <p class="mb-1">Author : <strong class="author ">${book.author}</strong></p>
        <p class="mb-0">Category : <strong class="category ">${book.category}</strong></p>
    </div>
    <div class="d-flex justify-content-around mt-3">
      <button type="button" class="btn btn-success es-btn" onclick="editSave(this)">Edit</button>
      <button type="button" class="btn btn-danger dlt-btn" onclick="dltBook(this)">Delete</button>
    </div>
</div>`;
    if (key != "") {
      if (
        book.title.toLowerCase().includes(key.toLowerCase()) ||
        book.author.toLowerCase().includes(key.toLowerCase())
      ) {
        $(".cards").append(card);
      }
    } else {
      $(".cards").append(card);
    }
  });
}
showBooks();
function dltBook(btn) {
  $(btn).closest(".card").remove();
  const id = $(btn).closest(".card").find(".bookId").text();
  books = books.filter((book) => book.bookId != id);
  localStorage.setItem("books", JSON.stringify(books));
}

function editSave(btn) {
  //fetch
  $card = $(btn).closest(".card");
  let id = $card.find(".bookId").text();
  let title = $card.find(".title").text();
  let category = $card.find(".category").text();
  let available = $card.find(".available").text();
  let author = $card.find(".author").text();
  //edit form
  if ($(btn).text() == "Edit") {
    const card = `
<form action="submit" class="form"> 
    <div class="d-flex justify-content-between border-bottom pb-2 mb-3">
        <p class="mb-0 text-truncate " style="width:80%">
            <input type="text" class="title p-0" value="${title}" required style="width:90%">
        </p>
     <p class="mb-0  text-success available">
        <select value="${available}" class="p-0" required>
        ${console.log(available)}
${
  available == "available"
    ? `<option value="available" selected>available</option>`
    : `<option value="available">available</option>`
}
${
  available == "issued"
    ? `<option value="issued" selected>issued</option>`
    : `<option value="issued">issued</option>`
}

        </select>
    </p>
    </div>  
    <div class="details">
        <p class="mb-1">BookId :
             <strong class="bookId ">${id}</strong>
        <p class="mb-1">Author : <input class="author p-0" type="text" value="${author}" required></p>
       <p class="mb-0">Category :
         <select value="${category}" class="p-0 category" required>
${
  category == "fantasy"
    ? `<option value="fantasy" selected>fantasy</option>`
    : `<option value="fantasy">fantasy</option>`
}
${
  category == "comisc"
    ? `<option value="comisc" selected>comisc</option>`
    : `<option value="comisc">comisc</option>`
}
${
  category == "history"
    ? `<option value="history" selected>history</option>`
    : `<option value="history">history</option>`
}
${
  category == "sci-fi"
    ? `<option value="sci-fi" selected>sci-fi</option>`
    : `<option value="sci-fi">sci-fi</option>`
}
${
  category == "self-help"
    ? `<option value="self-help" selected>self-help</option>`
    : `<option value="self-help">self-help</option>`
}
${
  category == "other"
    ? `<option value="other" selected>other</option>`
    : `<option value="other">other</option>`
}

        </select></p>
    </div>
    <div class="d-flex justify-content-around mt-3">
      <button type="button" class="btn btn-success es-btn" onclick="editSave(this)">Save</button>
      <button type="button" class="btn btn-danger dlt-btn" onclick="dltBook(this)">Delete</button>
    </div>
    </form>
`;
    $card.html(card$);
  } else {
const form=$card.find("form");
    if (!$card.find(".form")[0].reportValidity()) {
        return;
    }
    //save--------------
    title = $card.find(".title").val();
    category = $card.find(".category").val();
    available = $card.find(".available").find("select").val();
    author = $card.find(".author").val();
    // -----------------
    let old = false;
    books.forEach((book) => {
      if (book.bookId == id) {
        book.title = title;
        book.author = author;
        book.available = available;
        book.category = category;
        old = true;
      }
    });
    if (!old) {
      books.push({
        bookId: id,
        title: title,
        author: author,
        available: available,
        category: category,
      });
    }
    localStorage.setItem("books", JSON.stringify(books));
    showBooks();
    const card = ` <div class="d-flex justify-content-between border-bottom pb-2 mb-3">
        <p class="mb-0 text-truncate " style="width:80%"><strong class="title">${title} </strong></p>
      ${available == "available" ? `<p class="mb-0 text-success available">${available}</p>` : `<p class="mb-0 text-danger available">${available}</p>`}  
             
    </div>
    
    <div class="details">
        <p class="mb-1">BookId : <strong class="bookId ">${id}</strong></p>
        <p class="mb-1">Author : <strong class="author ">${author}</strong></p>
        <p class="mb-0">Category : <strong class="category ">${category}</strong></p>
    </div>
    <div class="d-flex justify-content-around mt-3">
      <button type="button" class="btn btn-success es-btn" onclick="editSave(this)">Edit</button>
      <button type="button" class="btn btn-danger dlt-btn" onclick="dltBook(this)">Delete</button>
    </div>`;
    $card.html(card);
  }
}
function addNew() {
  const id = Math.floor(Math.random() * 9999 + 100);
  let title = "";
  let category = "";
  let available = "";
  let author = "";
  const card = `<div class="card p-3 mx-auto my-3 shadow-sm" style="width: 300px; height: 300px;">
<form action="submit" class="form"> 
    <div class="d-flex justify-content-between border-bottom pb-2 mb-3">
        <p class="mb-0 text-truncate " style="width:80%">
            <input type="text" class="title p-0" value="${title}" required style="width:90%">
        </p>
     <p class="mb-0  text-success available">
        <select value="${available}" required class="p-0">
${
  available == "available"
    ? `<option value="available" selected>available</option>`
    : `<option value="available">available</option>`
}
${
  available == "issued"
    ? `<option value="issued" selected>issued</option>`
    : `<option value="issued">issued</option>`
}

        </select>
    </p>
    </div>  
    <div class="details">
        <p class="mb-1">BookId :
             <strong class="bookId ">${id}</strong>
        <p class="mb-1">Author : <input class="author p-0" type="text" value="${author}" required></p>
         <p class="mb-0">Category :
         <select value="${category}" class="p-0 category" required>
${
  category == "fantasy"
    ? `<option value="fantasy" selected>fantasy</option>`
    : `<option value="fantasy">fantasy</option>`
}
${
  category == "comisc"
    ? `<option value="comisc" selected>comisc</option>`
    : `<option value="comisc">comisc</option>`
}
${
  category == "history"
    ? `<option value="history" selected>history</option>`
    : `<option value="history">history</option>`
}
${
  category == "sci-fi"
    ? `<option value="sci-fi" selected>sci-fi</option>`
    : `<option value="sci-fi">sci-fi</option>`
}
${
  category == "self-help"
    ? `<option value="self-help" selected>self-help</option>`
    : `<option value="self-help">self-help</option>`
}
${
  category == "other"
    ? `<option value="other" selected>other</option>`
    : `<option value="other">other</option>`
}

        </select></p>
    </div>
    <div class="d-flex justify-content-around mt-3">
      <button type="button" class="btn btn-success es-btn" onclick="editSave(this)">Save</button>
      <button type="button" class="btn btn-danger dlt-btn" onclick="dltBook(this)">Delete</button>
    </div>
    </form>
    </div>
`;
  $(".cards").prepend(card);
}
