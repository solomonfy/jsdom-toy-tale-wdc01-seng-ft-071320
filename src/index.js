const url = "http://localhost:3000/toys/";
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function fetchToys() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => getToys(data));
  }
  fetchToys();

  function getToys(toys) {
    for (const element of toys) {
      addToy(element);
    }
  }

  function addToy(toy) {
    let toysDiv = document.querySelector("#toy-collection");
    let div = document.createElement("div");
    div.className = "card";

    let h2 = document.createElement("h2");
    h2.className = "name";
    h2.innerText = toy.name;

    let image = document.createElement("img");
    image.className = "toy-avatar";
    image.src = toy.image;

    let p = document.createElement("p");
    p.innerText = toy["likes"];

    let likeBtnTag = document.createElement("button");
    likeBtnTag.className = "like-btn";
    likeBtnTag.innerText = "Like";
    //PATCH request to update likes

    likeBtnTag.addEventListener("click", function () {
      console.log("Clicked like btn");

      toyObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: (toy.likes += 1),
        }),
      };

      fetch(url + toy.id, toyObj)
        .then((resp) => resp.json())
        .then((updatedToyObj) => {
          p.innerText = updatedToyObj.likes;
        });

      // form.reset();
      event.preventDefault();
    });

    // console.log(updatedToyObj)

    div.append(h2, image, p, likeBtnTag);
    toysDiv.append(div);
    let delBtn = document.createElement("BUTTON");
    delBtn.innerText = "DELETE";
    div.append(delBtn);
    //DELETE
    delBtn.addEventListener("click", function () {
      fetch(url + toy.id, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then(() => div.remove());

      event.preventDefault();
    });
  }

  // POST
  let form = document.getElementsByClassName("add-toy-form")[0];

  form.addEventListener("submit", function () {
    console.log("Hello");
    event.preventDefault;
    let toyName = event.target[0].value;
    let toyimage = event.target[1].value;
    let submBtn = event.target[2].value;

    // create object to be passed as an argument for the post fetch request
    newToyObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: toyName,
        image: toyimage,
        likes: 0,
      }),
    };

    fetch(url, newToyObj)
      .then((resp) => resp.json())
      .then((newToy) => addToy(newToy));
    form.reset();
    event.preventDefault();
  });
});
