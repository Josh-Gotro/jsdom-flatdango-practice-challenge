// GLOBAL
const url = "http://localhost:3000/films"
let poster = document.getElementsByClassName("four wide column")[1];
let info = document.getElementsByClassName("four wide column")[2];
let allFilms;
let showCard;
let currentFilm;



//  DOM LISTENER
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    fetchFilms();
    // fetchPost();
    buyTicket();
  
  });

//  FETCH
function fetchFilms(){
    fetch(url).then(r => r.json()).then(films => filmPoster(films))
};

function fetchPatch(tixSold){
    currentUrl = `${url}/${allFilms[0].id}`
    console.log(tixSold)
    fetch( currentUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({tickets_sold: tixSold})
    })
};

// HELPERS

// films from json to DOM
function filmPoster(films){
    allFilms = films
    firstPoster();
    movieInfo();
};

// poster image to dom
function firstPoster() {
    let pstrImage = document.getElementById("poster")
    pstrImage.src = allFilms[0].poster
}

// monvie info to dom
function movieInfo() {
    let tit = document.getElementById("title")
    tit.innerText = allFilms[0].title

    let rntm = document.getElementById("runtime")
    rntm.innerText = `${allFilms[0].runtime} minutes`

    let desc = document.getElementById("film-info")
    desc.innerText = allFilms[0].description

    let shwt = document.getElementById("showtime")
    shwt.innerText = allFilms[0].showtime

    let tix = document.getElementById("ticket-num")
    let tixRem = (allFilms[0].capacity - allFilms[0].tickets_sold)
    tix.innerText = `${parseInt(tixRem)}`
}

// purchase event listener
function buyTicket() {
    showCard = document.getElementById("showing")
    showCard.addEventListener('click', (e)=> {
        e.preventDefault();
        let desc = parseInt(showCard.querySelectorAll('span')[1].innerText)
        if (desc > 0) {
            allFilms[0].tickets_sold = allFilms[0].tickets_sold + 1
            let adjTicketsSold = allFilms[0].tickets_sold
            movieInfo()
           fetchPatch(adjTicketsSold)
        };
    })};