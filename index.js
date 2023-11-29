import "./scss/styles.scss"
import { stickers } from "./utils/stickers-data"
import Swiper, { Navigation, Autoplay, EffectCreative } from "swiper"
import "swiper/css/bundle"

const swiperWrapper = document.querySelector(".swiper-wrapper")
const slideTemplate = document.querySelector("#slide-template")

// РЕНДЕРИМ КАРТИНКИ

stickers.forEach((sticker) => {
  const slideElement = slideTemplate.content.cloneNode(true).querySelector(".swiper-slide")
  const img = slideElement.querySelector(".swiper-slide__img")
  img.src = sticker.image
  img.alt = sticker.title
  swiperWrapper.appendChild(slideElement)
})

// РЕНДЕРИМ СПИСОК СТИКЕРСОВ

const stickersList = document.querySelector(".stickers-list")
const stickersTemplate = document.querySelector("#stickers-template")

stickers.forEach((sticker) => {
  const stickerItem = stickersTemplate.content.cloneNode(true)
  const stickerImg = stickerItem.querySelector(".stickers-list__img")
  const stickerTitle = stickerItem.querySelector(".stickers-list__title")
  const stickerListItem = stickerItem.querySelector(".stickers-list__item")

  stickerImg.src = sticker.image
  stickerImg.alt = sticker.title
  stickerTitle.textContent = sticker.title
  stickerListItem.style.backgroundColor = sticker.backgroundColor

  stickersList.appendChild(stickerItem)
})

// ВЕШАЕМ СЛУШАТЕЛЬ НА КАРТИНКИ

const stickersItems = document.querySelectorAll(".stickers-list__item")

stickersItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    swiper.slideTo(index + 1)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  })
})

// ВЫПАДАЮЩЕЕ МЕНЮ

const dropdownContainer = document.querySelector(".stickers__dropdown-container")
const dropdownIcon = document.querySelector(".stickers__dropdown-icon")
const dropdownText = document.querySelector(".stickers__dropdown-text")

dropdownContainer.addEventListener("click", () => {
  stickersList.classList.toggle("stickers-list_opened")
  dropdownIcon.classList.toggle("stickers__dropdown-icon_opened")

  if (dropdownText.textContent === "Скрыть") {
    dropdownText.textContent = "Посмотреть все Стикерсы"
  } else {
    dropdownText.textContent = "Скрыть"
  }
})

// СВАЙПЕР

const titleElement = document.querySelector(".swiper__title")
const subtitleElement = document.querySelector(".swiper__subtitle")

const swiper = new Swiper(".swiper", {
  loopAdditionalSlides: 0,
  grabCursor: true,
  speed: 1500,
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  lazy: true,
  direction: "horizontal",
  allowTouchMove: true,
  sensitivity: 0.2,
  effect: "creative",
  creativeEffect: {
    prev: {
      translate: ["-90%", -50, -200],
      rotate: [-50, -50, -50]
    },
    next: {
      translate: ["90%", 50, -20],
      rotate: [50, 50, 50]
    }
  },
  autoplay: {
    delay: 3000
  },
  // можно убрать Autoplay, если мешает
  modules: [Navigation, EffectCreative, Autoplay],
  navigation: {
    nextEl: ".swiper-button__next",
    prevEl: ".swiper-button__prev"
  },
  on: {
    slideChange: function () {
      const activeIndex = this.activeIndex
      const lastSlideIndex = stickers.length - 1
      const slideIndex = activeIndex <= lastSlideIndex ? activeIndex : lastSlideIndex
      const activeSlide = stickers[slideIndex]
      const prevSlideIndex = slideIndex - 1 >= 0 ? slideIndex - 1 : lastSlideIndex
      const prevSlide = stickers[prevSlideIndex]

      titleElement.classList.add("text-slide-out")
      subtitleElement.classList.add("text-slide-out")

      setTimeout(() => {
        titleElement.textContent = prevSlide.title
        subtitleElement.textContent = prevSlide.subtitle
        titleElement.classList.add("text-slide-in")
        subtitleElement.classList.add("text-slide-in")
        setTimeout(() => {
          titleElement.classList.remove("text-slide-out", "text-slide-in")
          subtitleElement.classList.remove("text-slide-out", "text-slide-in")
        }, 800)
      }, 500)
    }
  }
})
