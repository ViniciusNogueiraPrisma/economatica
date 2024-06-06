function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

// função para atualizar o background do footer com base no data-theme
// document.addEventListener("DOMContentLoaded", function () {
//   const footerItem1 = document.querySelector(".footer-fixed");
//   const footerItem2 = document.querySelector(".footer");
//   const body = document.querySelector("body");

//   function updateFooterBackground() {
//     const dataTheme = body.getAttribute("data-theme");
//     const url = window.location.pathname;

//     if (url === "/" || url === "/default.aspx") {
//       footerItem1.style.backgroundColor = "var(--pure-white)";
//       footerItem2.style.backgroundColor = "var(--pure-white)";
//     } else {
//       footerItem1.style.backgroundColor = "#EEEEEE";
//       footerItem2.style.backgroundColor = "#EEEEEE";
//     }

//     if (dataTheme === "dark") {
//       footerItem1.style.backgroundColor = "initial";
//       footerItem2.style.backgroundColor = "initial";
//     }
//   }

//   function checkThemeAndURL() {
//     updateFooterBackground();
//   }
//   checkThemeAndURL();

//   const observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutation) {
//       if (mutation.attributeName === "data-theme") {
//         checkThemeAndURL();
//       }
//     });
//   });

//   observer.observe(body, { attributes: true });

//   updateFooterBackground();
// });

document.addEventListener("DOMContentLoaded", function () {
  let clicked = false;

  function handleClick(event) {
    event.preventDefault();

    if (clicked) {
      console.log("click ok");
    }

    clicked = true;
  }

  const linkInsideCurrLider = document.querySelector(".curr-lider a");

  if (linkInsideCurrLider) {
    linkInsideCurrLider.addEventListener("click", handleClick);
  }
});

$(".titulosCentral").each(function () {
  $("#resultsTitle").append($(this));
});

document.addEventListener("DOMContentLoaded", function () {
  var accordion = new bootstrap.Collapse(document.getElementById("conce"), {
    toggle: false,
  });

  var accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(function (item) {
    item.addEventListener("show.bs.collapse", function () {
      accordionItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          var collapse = new bootstrap.Collapse(
            otherItem.querySelector(".collapse"),
            {
              toggle: false,
            }
          );
          collapse.hide();
        }
      });
    });
  });
});

const counterUp = window.counterUp.default;

const callback = (entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    if (entry.isIntersecting && !el.classList.contains("is-visible")) {
      counterUp(el, {
        duration: 2000,
        // delay: 16,
      });
      el.classList.add("is-visible");
    }
  });
};

const IO = new IntersectionObserver(callback, { threshold: 1 });
const elements = document.querySelectorAll(".counter");

elements.forEach((el) => {
  IO.observe(el);
});

function redirectTo(event, contentId) {
  event.preventDefault();

  var targetElement = document.getElementById(contentId);

  if (targetElement) {
    var offset = -50;
    var targetPosition = targetElement.offsetTop - offset;

    var links = document.querySelectorAll(".list a");
    links.forEach(function (link) {
      link.classList.remove("active");
    });

    event.target.classList.add("active");

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

function updateActiveLink() {
  var links = document.querySelectorAll(".list a");
  var scrollPosition = window.scrollY;

  links.forEach(function (link) {
    var targetId = link.getAttribute("data-target");
    var targetElement = document.getElementById(targetId);

    if (targetElement) {
      var offset = 150;
      var targetPosition = targetElement.offsetTop - offset;

      if (
        scrollPosition >= targetPosition &&
        scrollPosition < targetPosition + targetElement.clientHeight
      ) {
        links.forEach(function (link) {
          link.classList.remove("active");
        });

        link.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

window.addEventListener("load", updateActiveLink);

$(".searchbox input").focus(function () {
  $(".searchbox .input-group").addClass("focused-border");
});

$(".searchbox input").focusout(function () {
  $(".searchbox .input-group").removeClass("focused-border");
});

// opens and closes the search box.

$(".open-searchbox, .close-searchbox").click(function () {
  $(".searchbox").toggleClass("active");
  $("body").toggleClass("open-menu");
});

// manages the status of the mobile menu.

$(".toggle-mobile-menu").click(function () {
  $(".mobile-menu-div").toggleClass("active");
  $(".header").toggleClass("open-menu");
  $("body").toggleClass("open-menu");
});

$(".button-mapa-site").click((e) => {
  $(".button-mapa-site").toggleClass("active");
});

// Código responsável por fazer o collapse das tables.

//$('.table:not(.table-not-break)').basictable({
//  breakpoint: 767
//});

// JOS.init();

// Animações para aparecer o elemento
AOS.init({
  // once: true,
  // easing: "ease-out-back",
  // duration: 1000,
});

// window.addEventListener(
//   "scroll",
//   debounce(() => {
//     AOS.refresh();
//   }, 200)
// );

// Tooltip

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Contraste

function accessApplyTheme(theme) {
  localStorage.setItem("access_theme", theme);

  if (theme == "dark") {
    $("body").attr("data-theme", "dark");
  } else {
    $("body").attr("data-theme", "light");
  }
}

var access_theme = "light";

if (localStorage.getItem("access_theme")) {
  access_theme = localStorage.getItem("access_theme");
  accessApplyTheme(access_theme);
}

$("#contrast-toggle").on("click", function (e) {
  if (access_theme == "light") {
    access_theme = "dark";
  } else {
    access_theme = "light";
  }
  accessApplyTheme(access_theme);
});

/* Hover do menu */

$(
  ".header .nav-menu-header .header-navigation-item > .dropdown-toggle"
).removeAttr("data-bs-toggle");

document
  .querySelectorAll(".header .nav-menu-header .header-navigation-item")
  .forEach((i) => {
    const dropdown = i.querySelector(".dropdown-menu");
    const toggle = i.querySelector(".dropdown-toggle");

    i.addEventListener("mouseover", () => {
      dropdown.classList.add("show");
      toggle.classList.add("active");
      setTimeout(() => {
        dropdown.style.opacity = "1";
      }, 10);
    });

    i.addEventListener("mouseleave", () => {
      dropdown.style.opacity = "0";
      toggle.classList.remove("active");
      dropdown.classList.remove("show");
    });
  });

//pausar imagem no hover se necessario
var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

//função trocando palavra com array
const words = ["dados financeiros", "cotações e fundos", "informação ágeis"];

const wordElement = document.getElementById("word");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenWords = 2000;

function typeWords() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    if (charIndex > 0) {
      wordElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWords, erasingSpeed);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeWords, typingSpeed);
    }
  } else {
    if (charIndex < currentWord.length) {
      wordElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeWords, typingSpeed);
    } else {
      isDeleting = true;
      setTimeout(typeWords, delayBetweenWords);
    }
  }
}

JOS.init();

//inicia a função de digitação
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeWords, delayBetweenWords);
});

/* Carousels */

$(document).ready(function () {
  if (window.matchMedia("(max-width: 767px)").matches) {
    // Slick Banner Home
    $("#destaques-home .box-destaques").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 700,
      fade: false,
      responsive: [
        {
          breakpoint: 475,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    // Slick Banner Home
    $(".destaques-carousel-home").slick({
      slide: ".item-destaque-home:not(.ignoreMe)",
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      // dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 700,
      fade: false,
      responsive: [
        {
          breakpoint: 475,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  $(".timeline-content-historia").slick({
    asNavFor: ".nav-timeline",
    slidesToShow: 1,
    slidesToScroll: 1,

    fade: false,
    arrows: false,
    infinite: false,
    useTransform: true,
    adaptiveHeight: true,
    draggable: true,
  });

  $(".nav-timeline").slick({
    asNavFor: ".timeline-content-historia",
    slidesToShow: 6,
    slidesToScroll: 1,

    dots: false,
    arrows: true,
    useTransform: true,
    infinite: false,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  });

  $(".nav-central-result-destaque").slick({
    slidesToScroll: 1,
    asNavFor: ".list-central-result-home",
    dots: false,
    arrows: true,
    slidesToShow: 1,
    infinite: false,
    focusOnSelect: true,
  });

  $(".list-central-result-home").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    infinite: false,
    asNavFor: ".nav-central-result-destaque",
  });

  $(".carousel-timeline-content").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    focusOnSelect: true,

    arrows: false,
    asNavFor: ".carousel-timeline-nav",
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".carousel-timeline-nav").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,

    dots: false,
    centerMode: false,
    focusOnSelect: true,

    asNavFor: ".carousel-timeline-content",
  });

  $(".carousel-timeline-nav .slick-next").on("click", () => {
    if ($(".slick-next").hasClass("slick-disabled")) {
      $(".slick-next.slick-disabled").attr("disabled", "disabled");
    }
  });

  $(".carousel-timeline-nav .slick-prev").on("click", () => {
    $(".slick-next").removeAttr("disabled");
  });
});

/* Focus no input */

function activeInputsFocus() {
  const inputs = document.querySelectorAll(
    ".div-input input, .div-input select, .div-input textarea"
  );

  inputs.forEach((input) => {
    if (input.value != "") {
      input.parentNode.classList.add("focus");
    }
    input.addEventListener("focus", (e) => {
      input.parentNode.classList.add("focus");
    });
    input.addEventListener("blur", (e) => {
      if (input.value == "") {
        input.parentNode.classList.remove("focus");
      }
    });
  });
}

activeInputsFocus();

/* Parar o vídeo quando fechar o modal */

function stopVideo() {
  let leg = $("#modalVideo iframe").attr("src");
  $("#modalVideo iframe").attr("src", leg);
}
if ($("modalVideo")) {
  $("#modalVideo").on("click", () => {
    setTimeout(() => {
      if (!$("#modalVideo").hasClass("show")) {
        stopVideo();
      }
    }, 200);
  });
}

/* Scroll to accordion */
$(document).ready(function () {
  let buttonAccordions = document.querySelectorAll(
    ".accordion:not(#accordionMenuMobile) button.accordion-button"
  );
  buttonAccordions.forEach((i) => {
    i.addEventListener("click", () => {
      setTimeout(() => {
        if (!i.classList.contains("collapsed")) {
          const id = i.getAttribute("data-bs-target");
          const section = $(id);
          const topo = section.offset().top;
          window.scrollTo({
            top: topo - 230,
            behavior: "smooth",
          });
        }
      }, 410);
    });
  });
});

const storys = new PrismaStories("slide", "openStorys", "closeStorys");
storys.init();
