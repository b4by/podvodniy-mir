function _createModal(course) {
  const _modal = document.createElement('div')
  _modal.classList.add('modal')
  _modal.insertAdjacentHTML('afterbegin', `
  <div class="modal__window" data-close="true">
    <div class="modal__container">
      <div class="modal__inner">
        <button type="button" class="modal__close" data-close="true"></button>
        <div class="modal__header">
          <h2 class="modal__header-title">Название курса</h2>
          <span class="modal__header-name">${course.name}</span>
        </div>
        <div class="modal__content">
          <h3 class="modal__content-title">${course.description.title}</h3>
          <p class="modal__content-text">${course.description.content}</p>
          <h3 class="modal__content-title">${course.price.title}</h3>
          <p class="modal__content-text">${course.price.content}</p>
        </div>
        <div class="modal__footer">
          <button type="button" class="btn btn-close" data-close="true">Закрыть</button>
          <button type="button" class="btn btn-submit">Записаться на этот курс</button>
        </div>
      </div>
    </div>
  </div>
  `)
  document.body.appendChild(_modal)
  return _modal
}

$$.modal = function(options) {
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  const $body = document.querySelector('body');
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if(destroyed) {
        return 
      }
      if(!closing) {
        $body.classList.add('modal-open')
        $modal.classList.add('open');
      }
        
    },
    goTo() {

    },
    close() {
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      $body.classList.remove('modal-open')
      setTimeout(() => {
        $modal.classList.remove('hide')
        closing = false
        modal.destroy()
      }, ANIMATION_SPEED)
    }
  }

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      destroyed = true
    }
  })
}

