let books = [
{
  bookId: "1001",
  author: "George R. R. Martin",
  category: "fantasy",
  title: "A Game of Thrones",
  available: "available",
},
{
  bookId: "1002",
  author: "Patrick Rothfuss",
  category: "fantasy",
  title: "The Name of the Wind",
  available: "issued",
},
{
  bookId: "1003",
  author: "Neil Gaiman",
  category: "comic",
  title: "The Sandman",
  available: "available",
},
{
  bookId: "1004",
  author: "Frank Miller",
  category: "comic",
  title: "The Dark Knight Returns",
  available: "issued",
},
{
  bookId: "1005",
  author: "Stephen E. Ambrose",
  category: "history",
  title: "Band of Brothers",
  available: "available",
},
{
  bookId: "1006",
  author: "Doris Kearns Goodwin",
  category: "history",
  title: "Team of Rivals",
  available: "issued",
},
{
  bookId: "1007",
  author: "Isaac Asimov",
  category: "sci-fi",
  title: "Foundation",
  available: "available",
},
{
  bookId: "1008",
  author: "Frank Herbert",
  category: "sci-fi",
  title: "Dune",
  available: "issued",
},
{
  bookId: "1009",
  author: "Robin Sharma",
  category: "self-help",
  title: "The Monk Who Sold His Ferrari",
  available: "available",
},
{
  bookId: "1010",
  author: "Mark Manson",
  category: "self-help",
  title: "The Subtle Art of Not Giving a F*ck",
  available: "issued",
},
{
  bookId: "1011",
  author: "Paulo Coelho",
  category: "other",
  title: "The Alchemist",
  available: "available",
},
{
  bookId: "1012",
  author: "Khaled Hosseini",
  category: "other",
  title: "The Kite Runner",
  available: "issued",
}
]
// for enter demo data 
// localStorage.setItem("books", JSON.stringify(books));

let loStor = JSON.parse(localStorage.getItem("books"));
if (loStor != null) {
  books = loStor;
}
let filterdBooks = [];
//flag for filter ,select all & active form
let setCat=false;
let setAll=true;
let active=false;
// filter books selected category
function filterBooks(cate) {
    setCat = false;
  filterdBooks = [];
  if(cate==''){setAll=true;setCat=false;showBooks();  return;}
   setAll=false;
  if(cate!=""){
    filterdBooks = books.filter((book) => book.category.toLowerCase() == cate);
    if(!filterdBooks.length){
      setCat=true;
    }
  }else{
    setCat=false;
  }
 
  showBooks();
}
states();
function showBooks(key = "") {
  $(".cards").empty();
  let searchList = [];

    if(setCat){
      $(".cards").empty();return;
    }
    
    if (filterdBooks.length && !setAll) {
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
    const $card = $(btn).closest(".card");
    const id = $card.find(".bookId").text();
    $card.remove();
    books = books.filter(book => book.bookId != id);
    localStorage.setItem("books", JSON.stringify(books));
    //check for edit form was delete
    active = $(".form").length > 0;
    //if no active form enable serach and category input
    if(!active){
       $("#category").removeClass("disable");
  $("#searchIn").removeClass("disable");
    }
    states();
}

function editSave(btn) {
  //fetch
  $card = $(btn).closest(".card");
  let id = $card.find(".bookId").text();
  let title = $card.find(".title").text();
  let category = $card.find(".category").text().trim();  
  let available = $card.find(".available").text();
  let author = $card.find(".author").text();
if(!active){


  //edit form
  if ($(btn).text() == "Edit") {
     $("#category").addClass("disable");
     $("#searchIn").val('');
  $("#searchIn").addClass("disable");
    active=true;
    const card = `
<form action="submit" class="form"> 
    <div class="d-flex justify-content-between border-bottom pb-2 mb-3">
        <p class="mb-0 text-truncate " style="width:80%">
            <input type="text" class="title " value="${title}" placeholder="title here" required style="width:90%">
        </p>
     <p class="mb-0  text-success available">
        <select value="${available}" class="p-0" required>
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
        <p class="mb-1">Author : <input class="author " type="text" placeholder="author" value="${author}" required></p>
       <p class="mb-0">Category :
         <select value="${category}" class="p-0 category" required>
${
  category == "fantasy"
    ? `<option value="fantasy" selected>fantasy</option>`
    : `<option value="fantasy">fantasy</option>`
}
${
  category == "comic"
    ? `<option value="comic" selected>comic</option>`
    : `<option value="comic">comic</option>`
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


    $card.html(card);
}
  } else if($(btn).text() == "Save"){
  // set no active form
  active=false;
   //when save form enable search and category input
  $("#category").removeClass("disable");
  $("#searchIn").removeClass("disable");
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
      states();
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
  // if pending new or edit no add new 
  if(active){return}
  active=true;
  //disable and reset category and search
   $("#category").addClass("disable");
  $("#category").html(` <option selected value="">Category</option>
              <option value="fantasy">Fantasy</option>
              <option value="comic">Comic</option>
              <option value="history">History</option>
              <option value="sci-fi">Sci-fi</option>
              <option value="self-help">Self-help</option>
              <option value="other">Other</option>`);
  $("#searchIn").val('');
  $("#searchIn").addClass("disable");
  showBooks();
  const id = Math.floor(Math.random() * 9999 + 100);
  let title = "";
  let category = "";
  let available = "";
  let author = "";
  const card = `<div class="card p-3 mx-auto my-3 shadow-sm" style="width: 300px; height: 300px;">
<form action="submit" class="form"> 
    <div class="d-flex justify-content-between border-bottom pb-2 mb-3">
        <p class="mb-0 text-truncate " style="width:80%">
            <input type="text" class="title " placeholder="title here" value="${title}" required style="width:90%">
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
        <p class="mb-1">Author : <input class="author " type="text" value="${author}" placeholder="author" required></p>
         <p class="mb-0">Category :
         <select value="${category}" class=" category" required>
${
  category == "fantasy"
    ? `<option value="fantasy" selected>fantasy</option>`
    : `<option value="fantasy">fantasy</option>`
}
${
  category == "comic"
    ? `<option value="comic" selected>comic</option>`
    : `<option value="comic">comic</option>`
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
};
function states() {
    let list=localStorage.getItem("books")
    let total=0;
    let available=0;
    let issued=0;
    books.forEach((book)=>{
        if(book.available=="available"){available++;}
        else{issued++;}
    })
    total=available+issued;
    $(".total").text(total);
    $(".ava").text(available)
    $(".issue").text(issued);;
}
//input 
$("#searchIn").on("input", function () {
    if (active) {
        $("#searchIn").val("");   
    }
    showBooks($(this).val().trim());
})
// category btn
$("#category").on("input", function () {
    if (active) {
        return;
    }
    
    filterBooks($(this).val().trim());
});