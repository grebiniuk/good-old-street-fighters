import View from './view';

class Modal extends View {
  formElement: HTMLFormElement;
  fieldSet: HTMLFieldSetElement;
  details: HTMLDivElement;

  constructor() {
    super();

    this.formElement = this.createElement({
      tagName: 'form',
    }) as HTMLFormElement;

    this.fieldSet = this.createElement({
      tagName: 'fieldset',
    }) as HTMLFieldSetElement;
    this.details = this.createElement({
      tagName: 'div',
      className: 'details',
    }) as HTMLDivElement;
    const updateBtn = this.createElement({
      tagName: 'button',
      className: 'wide-button',
      text: 'Ok',
    }) as HTMLButtonElement;
    updateBtn.onclick = this.onUpdate.bind(this);
    this.formElement.append(this.fieldSet, this.details, updateBtn);

    this.element = this.createElement({
      tagName: 'div',
      className: 'modal',
    });
    const modalContent = this.createElement({
      tagName: 'div',
      className: 'modal-content',
    }) as HTMLDivElement;
    const closeBtn = this.createElement({
      tagName: 'span',
      className: 'close',
      html: '&times;',
    }) as HTMLSpanElement;
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

  onUpdate(event: Event) {
    event.preventDefault();
    this.close();
  }
}

export default Modal;