// Настройки и инициализация owl-carousel 

export default function owlCarouselInit() {

  let prevArrow, nextArrow;
  prevArrow = "<svg width='8' height='13' viewBox='0 0 8 13' xmlns='http://www.w3.org/2000/svg'><path d='M7.54875 2.13499L3.18375 6.49999L7.54875 10.865C7.9875 11.3037 7.9875 12.0125 7.54875 12.4512C7.11 12.89 6.40125 12.89 5.9625 12.4512L0.798746 7.28749C0.359996 6.84874 0.359996 6.13999 0.798746 5.70124L5.9625 0.537494C6.40125 0.0987443 7.11 0.0987443 7.54875 0.537494C7.97625 0.976244 7.9875 1.69624 7.54875 2.13499Z'/></svg>"
  nextArrow = "<svg class='arrow-next' width='8' height='13' viewBox='0 0 8 13' xmlns='http://www.w3.org/2000/svg'><path d='M7.54875 2.13499L3.18375 6.49999L7.54875 10.865C7.9875 11.3037 7.9875 12.0125 7.54875 12.4512C7.11 12.89 6.40125 12.89 5.9625 12.4512L0.798746 7.28749C0.359996 6.84874 0.359996 6.13999 0.798746 5.70124L5.9625 0.537494C6.40125 0.0987443 7.11 0.0987443 7.54875 0.537494C7.97625 0.976244 7.9875 1.69624 7.54875 2.13499Z'/></svg>"

$('.owl-carousel').owlCarousel({
  nav: true,
  lazyLoad: true,
  navText: [prevArrow, nextArrow],
  responsive: {
    0: {
      margin: 8,
      items: 1
    },
    600: {
      margin: 8,
      items: 1
    },
    992: {
      margin: 15,
      items: 3
    },
    1200: {
      margin: 30,
      items: 3
    }
  }
})
}