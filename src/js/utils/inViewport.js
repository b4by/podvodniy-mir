export default function inViewport(element) {
  
  // Get the elements position relative to the viewport

  var bb = element.getBoundingClientRect();
  
  // Check if the element is outside the viewport
  // Then invert the returned value because you want to know the opposite

  return !(bb.top > innerHeight || bb.bottom < 0);
}