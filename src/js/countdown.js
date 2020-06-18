
import decOfNum from './utils/dec';
import inViewport from './utils/inViewport';

const countdown = (id, deadline) => {

  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor((t/1000) % 60),
          minutes = Math.floor((t/1000/60) % 60),
          hours = Math.floor((t/(1000 * 60 * 60)) % 24),
          days = Math.floor((t/(1000 * 60 * 60 * 24)));

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timerInterval = setInterval(updateClock, 1000);

    const dayName = document.querySelectorAll('#day-name'),
          hourName = document.querySelector('#hour-name'),
          minuteName = document.querySelector('#minute-name'),
          secondName = document.querySelector('#second-name');

      updateClock()

      function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = addZero(t.days);
        dayName.forEach(el => {
          el.innerHTML = decOfNum(t.days, ['день', 'дня', 'дней'])
        })
        hours.textContent = addZero(t.hours);
        hourName.textContent = decOfNum(t.hours, ['час', 'часа', 'часов'])
        minutes.textContent = addZero(t.minutes);
        minuteName.textContent = decOfNum(t.minutes, ['минута', 'минуты', 'минут'])
        seconds.textContent = addZero(t.seconds);
        secondName.textContent = decOfNum(t.seconds, ['секунда', 'секунды', 'секунд'])

        if (t.total <= 0) {
          days.textContent = "00";
          hours.textContent = "00";
          minutes.textContent = "00";
          seconds.textContent = "00";

          clearInterval(timerInterval);
        }
      }     
  }

  function addZero(num) {
    if (num <= 9) {
      return "0" + num;
    } else {
      return num
    }
  }

  setClock(id, deadline);

}

const showHideCountdown = () => {
  const countDownBig = document.querySelector('#countdown-big');
  const countDownSmall = document.querySelector('#countdown-small');
  const logo = document.querySelector(".nav__logo");

  // Если countdown-big во вьюпорте, то в nav
  // показываем логотип, иначе прячем логотип
  // и показываем счетчик

  if(inViewport(countDownBig)) {
    logo.classList.remove('is-disabled')
    countDownSmall.classList.remove('is-visible')
  } else {
    logo.classList.add('is-disabled')
    countDownSmall.classList.add('is-visible')
  }
}

export { countdown, showHideCountdown };
