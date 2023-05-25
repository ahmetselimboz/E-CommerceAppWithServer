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
    document.querySelector("nav").style.marginTop = "-120px";
  } else {
    document.querySelector("nav").style.marginTop = "0";
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

// const rank = document.querySelector(".rating2");
// rank.addEventListener('click', getRank)

// function getRank(){
//   var url =window.location.href
//   console.log(window.location.href);
//   console.log(url.slice(-1));
// }

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

const star = document.querySelector('.stars');
const starInput = document.querySelector("#in-stars");
//star.children[0].classList.value = "bx bxs-star";

//console.log(star.children[0].classList.value);

for(k=0;k<starInput.value;k++){
  star.children[k].classList.value = "bx bxs-star";
}
