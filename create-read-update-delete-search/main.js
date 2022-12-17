let title = document.getElementById("Title");
let price = document.getElementById("Price");
let tax = document.getElementById("Tax");
let ads = document.getElementById("Ads");
let discount = document.getElementById("Discount");
let total = document.getElementById("Total");
let duplicate = document.getElementById("Duplicate");
let category = document.getElementById("Category");
let createPro = document.getElementById("add");
let searchTitle = document.getElementById("searchTitle");
let searchCategories = document.getElementById("searchCategories");
let editElement;
let searchMode = "title";
let mode = "Create";
createPro.style.background = "#ef6b73";
createPro.innerHTML = "Please ensure that all data is filled out";

clearData = () => {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.value = "";
  category.value = "";
  duplicate.value = "";
};

getTotal = () => {
  if (price.value != "") {
    let resualt =
      // prettier-ignore
      (+price.value + +tax.value + +ads.value) * (1 - (+discount.value / 100));
    total.innerHTML = resualt;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = 0;
    total.style.backgroundColor = "#ef6b73";
  }
};

hideButton = () => {
  if (mode == "Create") {
    if (title.value && price.value && category.value) {
      createPro.style.background = "green";
      createPro.innerHTML = "Save";
    } else {
      createPro.style.background = "#ef6b73";
      createPro.innerHTML = "Please ensure that all data is filled out";
    }
  }
};

let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}

createPro.onclick = () => {
  if (title.value && price.value && category.value) {
    const inputs = [discount, tax, ads];
    for (const input of inputs) {
      if (input.value == "") {
        input.value = 0;
      }
    }
    let addPro = {
      title: title.value.toUpperCase(),
      price: price.value,
      tax: tax.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      category: category.value.toUpperCase(),
      duplicate: duplicate.value,
    };
    if (mode == "Create") {
      if (addPro.duplicate > 1) {
        for (let i = 0; i < addPro.duplicate; i++) {
          dataPro.push(addPro);
        }
      } else {
        dataPro.push(addPro);
      }
    } else {
      dataPro[editElement] = addPro;
      mode = "Create";
      createPro.innerHTML = "Please ensure that all data is filled out";
      duplicate.style.display = "block";
      createPro.style.background = "#ef6b73";
    }

    localStorage.setItem("products", JSON.stringify(dataPro));
    clearData();
    showData();
  }
};

showData = () => {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
      <th>${i}</th>
      <th>${dataPro[i].title}</th>
      <th>${dataPro[i].price}</th>
      <th>${dataPro[i].tax}</th>
      <th>${dataPro[i].ads}</th>
      <th>${dataPro[i].discount}</th>
      <th>${dataPro[i].total}</th>
      <th>${dataPro[i].category}</th>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>    
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All ${dataPro.length}</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
};
showData();

deleteData = (i) => {
  dataPro.splice(i, 1);
  localStorage.products = JSON.stringify(dataPro);
  showData();
};

updateData = (i) => {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  tax.value = dataPro[i].tax;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  createPro.style.background = "green";
  getTotal();
  duplicate.style.display = "none";
  category.value = dataPro[i].category;
  createPro.innerHTML = "Update";
  mode = "Update";
  editElement = i;
  scroll({ top: 0, behavior: "smooth" });
};

deleteAll = () => {
  localStorage.clear();
  dataPro.splice(0);
  showData();
};

getSearchMode = (id) => {
  let search = document.getElementById("Search");
  if (id === "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search by title";
  } else {
    searchMode = "category";
    search.placeholder = "Search by category";
  }
  search.focus();
};

searchData = (value) => {
  let table = "";

  if (searchMode == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toUpperCase())) {
        table += `
      <tr>
        <th>${i}</th>
        <th>${dataPro[i].title}</th>
        <th>${dataPro[i].price}</th>
        <th>${dataPro[i].tax}</th>
        <th>${dataPro[i].ads}</th>
        <th>${dataPro[i].discount}</th>
        <th>${dataPro[i].total}</th>
        <th>${dataPro[i].category}</th>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>    
      `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toUpperCase())) {
        table += `
      <tr>
        <th>${i}</th>
        <th>${dataPro[i].title}</th>
        <th>${dataPro[i].price}</th>
        <th>${dataPro[i].tax}</th>
        <th>${dataPro[i].ads}</th>
        <th>${dataPro[i].discount}</th>
        <th>${dataPro[i].total}</th>
        <th>${dataPro[i].category}</th>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>    
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
};
