"use strict";

let inputFilter = document.getElementById("filter");
let result = document.getElementById("result");

let listItem = [];

async function getItems() {
  let response = await fetch("https://reqres.in/api/users?page=2");
  if (response.status !== 200) {
    throw new Error("not founded");
  }
  let data = await response.json();
  return data;
}
getItems()
  .then((responseData) => {
    responseData.data.forEach((element) => {
      let li = document.createElement("li");
      li.innerText = `${element.first_name} ${element.last_name}`;

      listItem.push(li);
      result.appendChild(li);
    });
  })
  .catch((error) => console.log(error));

async function filter(searchItem) {
  listItem.forEach((element) => {
    if (element.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}
inputFilter.addEventListener("keyup", function (item) {
  filter(item.target.value);
});

// task 2

let ul = document.getElementById("ul");

function newTask() {
  return new Promise((resolve, reject) => {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((mosuliInfo) => {
        resolve(mosuliInfo);
      })
      .catch((error) => reject(error));
  });
}
newTask().then((responsedata) => {
  responsedata.data.forEach((element) => {
    let li = document.createElement("li");
    li.innerText = `${element.email}`;
    let img = document.createElement("img");
    img.setAttribute("src", `${element.avatar}`);
    li.appendChild(img);
    ul.appendChild(li);
  });
});
