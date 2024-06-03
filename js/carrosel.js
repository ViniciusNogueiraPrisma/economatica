var swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: "auto",
  // spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// window.addEventListener("resize", function () {
//   if (window.innerWidth < 1200) {
//     swiper.params.slidesPerView = 3;
//   } else {
//     swiper.params.slidesPerView = "auto";
//   }

//   swiper.update();
// });

// swiper.autoplay.start();
// swiper.params.autoplay.delay = 6000;

var swiper = new Swiper(".mySwiper-sec", {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 24,
  autoplay: {
    delay: 5000,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".mySwiper-home", {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 24,
  // pagination: {
  //   el: ".swiper-pagination",
  //   // type: "fraction",
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".mySwiper-xp", {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 24,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
