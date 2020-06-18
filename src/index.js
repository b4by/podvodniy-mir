// Подключение слайдера owl.carousel

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

// Инициализация owl-carousel

import owlCarouselInit from './js/owlCarouselInit';

// Подключение стилей

import './scss/style.scss';

// Подключеный base.js

import './js/base.js';

// Бургер-меню

import './js/burger';

// Форма

import formSubmit from './js/form/formSubmit';

// Счётчик countdown, функция для скрытия счётчика

import { countdown, showHideCountdown } from './js/countdown';


// Вспомогательное функция для отслеживания
// элементов во вьюпорте

import inViewport from './js/utils/inViewport';

// Функция дял вызыва события, когда пользовательский курсор
// уходит за пределы вьюпорта

import leavingPage from './js/utils/leavingPage';

// Модальное окно

import './js/modal';

const courseBtnMore = document.querySelectorAll('.course__btn-more');
courseBtnMore.forEach(btn => {
  const courseId = btn.id.replace( /^\D+/g, '');
  btn.addEventListener('click', (e) => {
    const modal = $$.modal(courses[courseId]);
    modal.open()
  })
})

// Дедлайн действия акции

const deadline = '2020-07-01' //YYYY-MM-DD

document.addEventListener('DOMContentLoaded', (e) => {
  countdown('#countdown-small', deadline);
  countdown('#countdown-big', deadline);
  owlCarouselInit();
  formSubmit();
})

document.addEventListener('scroll', (e) => {
  showHideCountdown();
})