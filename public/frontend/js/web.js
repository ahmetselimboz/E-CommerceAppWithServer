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