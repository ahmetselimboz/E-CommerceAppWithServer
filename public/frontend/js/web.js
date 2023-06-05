$(document).ready(function () {
  $(".customer-logos").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
});

window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    document.querySelector(".nav").style.marginTop = "-120px";
  } else {
    document.querySelector(".nav").style.marginTop = "0";
  }
};

// const api = new BookApi();
// var item = document.querySelectorAll(".book-img img");
// const value = api.api();
// value.then((result) => {
//     console.log(item.length);
//   for (i = 0; i < item.length; i++) {
//     item[i].src=result[0].books[i].book_image;
//   }
// });

function rate(stars) {
  const starElements = document.getElementsByClassName("star");
  for (let i = 0; i < starElements.length; i++) {
    if (i < stars) {
      starElements[i].classList.add("star-filled");
    } else {
      starElements[i].classList.remove("star-filled");
    }
  }
}



function follow(item) {
  document.querySelector("#rank-in").value = item.href.slice(-1);
}

const rankAll = document.querySelectorAll("#rating");
const rankInput = document.querySelectorAll("#in-rate");

for (let j = 0; j < rankAll.length; j++) {
  for (let index = 0; index < rankInput[j].value; index++) {
    rankAll[j].children[index].classList.add("rate");
  }
}

const star = document.querySelector(".stars");
const starInput = document.querySelector("#in-stars");
//star.children[0].classList.value = "bx bxs-star";

//console.log(star.children[0].classList.value);

for (k = 0; k < starInput.value; k++) {
  star.children[k].classList.value = "bx bxs-star";
}

function passwordHide() {
  const passInput = document.querySelector("#password");
  const passIcon = document.querySelector("#passIcon");
  passIcon.classList.remove("fa-eye");
  passIcon.style.color = "#333";
  passInput.type = "password";
  //console.log(passInput);
}
function passwordShow() {
  const passInput = document.querySelector("#password");
  const passIcon = document.querySelector("#passIcon");
  passIcon.classList.add("fa-eye");
  passIcon.style.color = "#119500";
  passInput.type = "text";
  //console.log(passInput);
}




function fadeIn() {
  setInterval(hideLogCard, 5000);
}

var opacity = 0;
var intervalID = 0;

function logCard() {
  const log = document.querySelector(".log-card");
  opacity = Number(window.getComputedStyle(log).getPropertyValue("opacity"));
  if (opacity < 1) {
    log.style.visibility = "visible"
    while (opacity < 1) {
      opacity = opacity + 0.1;
      log.style.opacity = opacity;
    }
    
  }
  fadeIn();
}

function hideLogCard() {
  //console.log("merhaba");
  opacity = 1;
  const log = document.querySelector(".log-card");
  opacity = Number(window.getComputedStyle(log).getPropertyValue("opacity"));
  if (opacity == 1) {
    while (opacity >= 0) {
      opacity = opacity - 0.1;
      log.style.opacity = opacity;
    }
    log.style.visibility = "hidden"
  }
}


function fadedIn() {
  setInterval(hideLoggedCard, 5000);
}


function loggedCard() {
  const log = document.querySelector(".loggedin-card");
  opacity = Number(window.getComputedStyle(log).getPropertyValue("opacity"));
  if (opacity < 1) {
    log.style.visibility = "visible"
    
    while (opacity < 1) {
      opacity = opacity + 0.1;
      log.style.opacity = opacity;
    }
    
  }
  fadedIn();
}

function hideLoggedCard() {
  //console.log("merhaba");
  opacity = 1;
  const log = document.querySelector(".loggedin-card");
  opacity = Number(window.getComputedStyle(log).getPropertyValue("opacity"));
  if (opacity == 1) {
    log.style.visibility = "hidden"
    while (opacity >= 0) {
      opacity = opacity - 0.1;
      log.style.opacity = opacity;
    }
  
  }
}