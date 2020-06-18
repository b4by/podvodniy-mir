const leavingPage = (fn) => {
  if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
    fn();
  }
}

export default leavingPage;

