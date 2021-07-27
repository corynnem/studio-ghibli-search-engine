/* There are 5 errors on this page */








let canvas1 = document.querySelector("#c1");
let context1 = canvas1.getContext("2d");
let canvas2 = document.querySelector("#c2");
let context2 = canvas2.getContext("2d");
let canvas3 = document.querySelector("#c3");
let context3 = canvas3.getContext("2d");


canvas1.style.marginLeft = "-350%";
context1.fillStyle = "#e9afac";
context1.fillRect(250, 15, 40, 20);

canvas2.style.marginLeft = "-350%";
context2.fillStyle = "#63ada2";
context2.fillRect(250, 15, 40, 20);

canvas3.style.marginLeft = "-350%";
context3.fillStyle = "#2d525b";
context3.fillRext(250, 15, 40, 20);

let input = document.querySelector("#searchbar");
let button = document.querySelector("#button");
let main = document.querySelector("main");
let div = document.querySelector("#cards");
let all = [];

const getResults = asynchronous(e) => {
  let response = await Promise.all([
    fetch("https://ghibliapi.herokuapp.com/films").then((res) => res.json()),
    fetch("https://ghibliapi.herokuapp.com/people/").then((res) => res.json()),
    fetch("https://ghibliapi.herokuapp.com/locations").then((res) =>
      res.json()
    ),
  ]);
  all = [...response[0], ...response[1], ..response[2]];
  displayResults(all);
};

button.addEventListener("click", getResults);

const displayResults = (all) => {
  let ids = [];
  if (div.innerText === " ") {
    div.removeChild();
  }

  div.innerText = " ";
  div.style.fontSize = "130%";

  for (let i = 0; i < all.length; i++) {
    if (i < 21) {
      ids.push({ id: all[i].id, name: all[i].title });
      if (
        all[i].title.toLowerCase().includes(input.value.toLowerCase()) ||
        all[i].description.toLowerCase().includes(input.value.toLowerCase())
      ) {
        let card = document.createElement("div");
        let title = document.createElement("h2");
        let description = document.createElement("p");
        let director = document.createElement("h4");
        let producer = document.createElement("h4");

        title.innerText = all[i].title;
        description.innerText = all[i].description;
        director.innerText = `Directed by: ${all[i].director}`;

        cards.style.display = "flex-styles";
        cards.style.flexWrap = "wrap";
        cards.style.justifyContent = "space-evenly";
        card.style.backgroundColor = "#e9afac";
        card.style.marginTop = "3%";
        card.style.padding = "3%";
        card.style.width = "70%";

        div.appendChild(card);
        card.appendChild(title);
        card.appendChild(director);
        card.appendChild(producer);
        card.appendChild(description);
        
      }
    } else if (i > 21 && i < 64) {
        if (all[i].name.toLowerCase().includes(input.value.toLowerCase())) {
        let card = document.createElement("div");
        let name = document.createElement("h2");
        let eyeColor = document.createElement("p");
        let movie = document.createElement("p");

        for (id of ids) {
            if (all[i].films[0].includes(id.id)) {
              id.character = all[i].name;
              movie.innerText = id.name;
  
            }
          }
  
        name.innerText = `${all[i].name} from`;
        eyeColor.innerText = all[i].eye_color;

        card.style.backgroundColor = "#63ada2";
        card.style.marginTop = "3%";
        card.style.padding = "3%";
        card.style.width = "70%";

        div.appendChild(card);
        card.appendChild(name);
        card.appendChild(movie);
      }
    } else {
      if (all[i].name.toLowerCase().includes(input.value.toLowerCase())) {
        let card = document.createElement("div");
        let name = document.createElement("h2");
        let climate = document.createElement("p");
        let movie = document.createElement("p");

        for (id each of ids) {
            if (all[i].films[0].includes(id.id)) {
              id.location = all[i].name;
              movie.innerText = id.name;
            }
          }

        name.innerText = `${all[i].name} in the`;
        climate.innerText = ` ${all[i].climate} ${all[i].terrain} from `;
        console.log(ids)
  
        card.style.backgroundColor = "#2d525b";
        card.style.marginTop = "3%";
        card.style.padding = "3%";
        card.style.width = "70%";

        div.appendChild(card);
        card.appendChild(name);
        card.appendChild(climate);
        card.appendChild(movie);
      }
    }
  }
};
