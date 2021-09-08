"use strict"

/* Menu */
const menuButton = document.querySelector('.menu__button');
const menuList = document.querySelector('.menu__list');
const pageLock = document.querySelector('.page');

menuButton.addEventListener('click', () => {
    let expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
    expanded ? menuButton.setAttribute('aria-label', 'Открыть меню') : menuButton.setAttribute('aria-label', 'Закрыть меню');
    menuButton.classList.toggle('menu__icon-cross');
    menuList.classList.toggle('menu__list--open');
    pageLock.classList.toggle('page--lock');
});

/* Color scheme switcher */
const switcherButton = document.querySelector('.color-scheme-switcher__input');
const lightScheme = document.querySelectorAll('#lightScheme');
const darkScheme = document.querySelectorAll('#darkScheme');
let localScheme = localStorage.getItem('color-scheme');

function enableDarkScheme() {
    lightScheme[0].media = "not all";
    darkScheme[0].media = "all";
    switcherButton.checked = true;
    localStorage.setItem('color-scheme', 'dark');
}

function enableLightScheme() {
    lightScheme[0].media = "all";
    darkScheme[0].media = "not all";
    switcherButton.checked = false;
    localStorage.setItem('color-scheme', 'light');
}

function setScheme(s) {
    switch (s) {
        case "light":
            enableLightScheme();
            break;
        case "dark":
            enableDarkScheme();
            break;
    }
}

function changeScheme() {
    switch (switcherButton.checked) {
        case false:
            enableLightScheme();
            break;
        case true:
            enableDarkScheme();
            break;
    }
}

switcherButton.addEventListener('click', () => {
    changeScheme();
})

setScheme(localScheme);

/* Team Swiper Slider */
const teamSwiper = new Swiper('.team__swiper-container', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 30,

    breakpoints: {
        320: {
            centeredSlides: true,
        },
        480: {
            centeredSlides: false,
        }
    },

    pagination: {
        el: '.team__swiper-pagination',
        clickable: true,
    },
});

/* Feedback Swiper Slider */
const feedbackSwiper = new Swiper('.feedback__swiper-container', {
    direction: 'horizontal',

    breakpoints: {
        160: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        }
    },

    pagination: {
        el: '.feedback__swiper-pagination',
        clickable: true,
    },
});

/* Blog Swiper Slider */
const blogSwiper = new Swiper('.blog__swiper-container', {
    direction: 'horizontal',

    breakpoints: {
        160: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        }
    },

    pagination: {
        el: '.blog__swiper-pagination',
        clickable: true,
    },
});

/* MixItUp Filter*/
const mixer = mixitup('.filter__container', {
    animation: {
        duration: 300
    }
});

/* Scrolling to beginning */
const goBack = document.querySelector('.footer__go-back')
goBack.addEventListener('click', function () {
    window.scrollBy({
        top: -document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
});