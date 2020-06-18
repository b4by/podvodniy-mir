const formSubmit = () => {
  const form = document.forms[0];
  const name = document.querySelector('input[name="name"]');
  const email = document.querySelector('input[name="email"');
  const phone = document.querySelector('input[name="phone"]');
  
  form.addEventListener('keyup', (e) => {
    const input = event.target;
    const label = input.nextElementSibling;
    const nodeName = event.target.nodeName;
    const inputValue = event.target.value;

    if(nodeName === 'INPUT' && inputValue !== '') {
      label.classList.add('form__label--active')
    } else {  
      input.classList.remove('validated');
      label.classList.remove('form__label--active')
    }
  })
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    checkInputs()
  })
  
  function checkInputs() {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
  
    if (nameValue === '') {
      setErrorFor(name, 'Пожалуйста, заполните поле');
    } else {
      setSuccessFor(name);
    }
  
    if (emailValue === '') {
      setErrorFor(email, 'Пожалуйста, заполните поле');
    } else if(!isEmail(emailValue)) {
      setErrorFor(email, 'Неправильный email');
    } else {
      setSuccessFor(email);
    }
  
    if (phoneValue === '') {
      setErrorFor(phone, 'Пожалуйста, заполните поле');
    } else if(!isPhone(phoneValue)) {
      setErrorFor(phone, 'Неверный номер телефона')
    } else {
      setSuccessFor(phone);
    }
  }
  
  function setErrorFor(input, message) {
    const errorMessageNode = input.nextElementSibling.nextElementSibling;
    input.classList.add('invalid');
    errorMessageNode.className = 'show';
    errorMessageNode.innerText = message;
  }
  
  function setSuccessFor(input, message) {
    const errorMessageNode = input.nextElementSibling.nextElementSibling;
    errorMessageNode.className = 'hide';
    input.classList.remove('invalid');  
    input.classList.add('validated');
  }
  
  function isEmail(email) {
    return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)
  }
  
  function isPhone(phone) {
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(phone)
  }
  
}

export default formSubmit;