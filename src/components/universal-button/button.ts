export default class Button {
  static createReadyButtonElement(
    innerText: string,
    onClickFunction?: () => void
  ): HTMLButtonElement {
    const personalClassName = `${innerText}-button`;
    const newButtonElement = document.createElement('button');
    newButtonElement.innerText = innerText;
    newButtonElement.className = `button ${personalClassName}`;
    if (onClickFunction) {
      newButtonElement.addEventListener('click', onClickFunction);
    }
    return newButtonElement;
  }
}
