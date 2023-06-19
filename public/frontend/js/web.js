////////////////////SLİDER EFEKTİ////////////////////////

$(document).ready(function () {
  $(".customer-logos").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
});

var viewport_width = window.innerWidth;

if (viewport_width <= 480) {
  document.querySelector(".nav-bottom").classList.add("display-none");
  document.querySelector(".search").classList.add("display-none");
}
function navshow() {
  document.querySelector(".search").classList.toggle("display-none");
}
function navmenushow() {
  document.querySelector(".nav-bottom").classList.toggle("display-none");
}

// $("#menu-icon").click(function (event) {
//   console.log("merhaba");
//   if ($(".nav-bottom").is(":hidden")) {
//     console.log("merhaba");
//     $(".nav-bottom").stop().animate(
//       {
//         visibility: "visible",
//         right: "520px",
//       },
//       1300
//     );
//   } else {
//     console.log("merhaba");
//     $(".nav-bottom").stop().animate(
//       {
//         visibility: "visible",
//         height: "320px",
//       },
//       1300
//     );
//   }
// });

////////////////////NAVBAR SCROLL EFEKTİ////////////////////////

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

// function rate(stars) {
//   const starElements = document.getElementsByClassName("star");
//   for (let i = 0; i < starElements.length; i++) {
//     if (i < stars) {
//       starElements[i].classList.add("star-filled");
//     } else {
//       starElements[i].classList.remove("star-filled");
//     }
//   }
// }

//////////VERİLEN YILDIZ DEĞERİNİ REQUESTE EKLEME////////////////c

function follow(item) {
  document.querySelector("#rank-in").value = item.href.slice(-1);
}

////////////////////YORUM YILDIZ GÖSTER////////////////////////

const rankAll = document.querySelectorAll("#rating");
const rankInput = document.querySelectorAll("#in-rate");

for (let j = 0; j < rankAll.length; j++) {
  for (let index = 0; index < rankInput[j].value; index++) {
    rankAll[j].children[index].classList.add("rate");
  }
}

////////////////////FAVORİLER ORTALAMA YILDIZ GÖSTER////////////////////////

const rankkAll = document.querySelectorAll("#ratingg");
const rankkInput = document.querySelectorAll("#in-ratee");

for (let j = 0; j < rankkAll.length; j++) {
  for (let index = 0; index < rankkInput[j].value; index++) {
    rankkAll[j].children[index].classList.add("bxs-star");
  }
}

////////////////////DETAYLAR ORTALAMA YILDIZ GÖSTER////////////////////////

const star = document.querySelector(".stars");
const starInput = document.querySelector("#in-stars");

if (starInput) {
  for (k = 0; k < starInput.value; k++) {
    star.children[k].classList.value = "bx bxs-star";
  }
}

////////////////////ŞİFRE GÖSTER & GİZLE////////////////////////

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

////////////////////KAYIT OL & GİRİŞ YAP KARTI////////////////////////

function fadeIn() {
  setInterval(hideLogCard, 5000);
}

var opacity = 0;
var intervalID = 0;

function logCard() {
  const log = document.querySelector(".log-card");
  opacity = Number(window.getComputedStyle(log).getPropertyValue("opacity"));
  if (opacity < 1) {
    log.style.visibility = "visible";
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
    log.style.visibility = "hidden";
  }
}

////////////////////BİLGİLERİM & ÇIKIŞ YAP KARTI////////////////////////

function fadedIn() {
  setInterval(hideLoggedCard, 5000);
}

function loggedCard() {
  const log = document.querySelector(".loggedin-card");
  opacity = Number(window.getComputedStyle(log).getPropertyValue("opacity"));
  if (opacity < 1) {
    log.style.visibility = "visible";

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
    log.style.visibility = "hidden";
    while (opacity >= 0) {
      opacity = opacity - 0.1;
      log.style.opacity = opacity;
    }
  }
}

////////////////////////////////////////////////////////////////////
