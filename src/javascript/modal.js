import View from './view';

class Modal extends View {
  constructor() {
    super();

    this.formElement = this.createElement({
      tagName: 'form',
    });
    this.fieldSet = this.createElement({
      tagName: 'fieldset',
    });
    this.details = this.createElement({
      tagName: 'div',
      className: 'details',
    });
    const updateBtn = this.createElement({
      tagName: 'button',
      className: 'button',
      text: 'Ok',
    });
    updateBtn.onclick = this.onUpdate.bind(this);
    this.formElement.append(this.fieldSet, this.details, updateBtn);

    this.element = this.createElement({
      tagName: 'div',
      className: 'modal',
    });
    const modalContent = this.createElement({
      tagName: 'div',
      className: 'modal-content',
    });
    const closeBtn = this.createElement({
      tagName: 'span',
      className: 'close',
      html: '&times;',
    });
    modalContent.append(
        closeBtn,
        this.formElement,
    );
    this.element.append(modalContent);

    closeBtn.onclick = this.close.bind(this);

    window.onclick = (event) => {
      if (event.target === this.element) {
        this.close();
      }
    };
  }

  close() {
    this.element.style.visibility = 'hidden';
  }

  show() {
    this.element.style.visibility = 'visible';
  }

  onUpdate(event) {
    event.preventDefault();
    this.close();
  }
}

export default Modal;