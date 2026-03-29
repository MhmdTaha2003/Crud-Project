let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catigories = document.getElementById("catigories");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value !== "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.background = "blue";
  } else {
    total.innerHTML = "";
    total.style.background = "#7c0101";
  }
}

// create product   and clear inputs
let data = localStorage.getItem("product");
let product;
if (data != null && data !== "") {
  product = JSON.parse(data);
} else {
  product = [];
}

submit.onclick = function () {
  // create product
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    catigories: catigories.value,
  };

  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        product.push(newPro);
      }
    } else product.push(newPro);
  } else {
    product[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.disabled = false;
  }

  localStorage["product"] = JSON.stringify(product);

  ClearData();
  Display();
};

// clear input
function ClearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  ((total.innerHTML = ""),
    (total.style.background = "#7c0101"),
    (catigories.value = ""));
  count.value = "";
}

// display
function Display() {
  table = ``;
  for (let i = 0; i < product.length; i++) {
    table += `<tr>
                    <td>${i + 1}</td>
                    <td>${product[i].title}</td>
                    <td>${product[i].price}</td>
                    <td>${product[i].taxes}</td>
                    <td>${product[i].ads}</td>
                    <td>${product[i].discount}</td>
                    <td>${product[i].total}</td>
                    <td>${product[i].catigories}</td>
                    <td><button onclick="Update(${i})">update</button></td>
                    <td><button onclick="DeleteData(${i})">delete</button></td>
                </tr>`;
  }
  document.querySelector("table tbody").innerHTML = table;
  DeleteAll();
}
Display();

// delete row
function DeleteData(i) {
  // console.log(i);
  product.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(product));
  Display();
}

function DeleteAll() {
  let delAll = document.getElementById("DeleteAll");
  delAll.innerHTML = `Delete All (${product.length})`;
  if (product.length > 0) {
    delAll.style.display = "block";
  } else {
    delAll.style.display = "none";
  }
  delAll.onclick = function () {
    product = [];
    localStorage.clear();
    Display();
  };
}

// update
function Update(i) {
  title.value = product[i].title;
  price.value = product[i].price;
  taxes.value = product[i].taxes;
  ads.value = product[i].ads;
  discount.value = product[i].discount;
  catigories.value = product[i].catigories;
  count.disabled = true;
  submit.innerHTML = "Update";
  getTotal();

  tmp = i;
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMode = "title";

function  getsearchmode(id) {
  let searchBox = document.getElementById("search");
  if (id == "searchtitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  // searchBox.style.background= "red";
  searchBox.focus();
  searchBox.placeholder = "search by " + searchMode;
    Display();

}

function SearchContent(value) {
  let table = "";

  for (let i = 0; i < product.length; i++) {
    if (searchMode === "title") {
      if (product[i].title.includes(value)){
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${product[i].title}</td>
                    <td>${product[i].price}</td>
                    <td>${product[i].taxes}</td>
                    <td>${product[i].ads}</td>
                    <td>${product[i].discount}</td>
                    <td>${product[i].total}</td>
                    <td>${product[i].catigories}</td>
                    <td><button onclick="Update(${i})">update</button></td>
                    <td><button onclick="DeleteData(${i})">delete</button></td>
                </tr>`;
    } }else {
      if (product[i].catigories.includes(value)){
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${product[i].title}</td>
                    <td>${product[i].price}</td>
                    <td>${product[i].taxes}</td>
                    <td>${product[i].ads}</td>
                    <td>${product[i].discount}</td>
                    <td>${product[i].total}</td>
                    <td>${product[i].catigories}</td>
                    <td><button onclick="Update(${i})">update</button></td>
                    <td><button onclick="DeleteData(${i})">delete</button></td>
                </tr>`;
    }
    }
    document.querySelector("table tbody").innerHTML = table;
  }
}
// console.log("ggggggggggggggggggggg q q")
