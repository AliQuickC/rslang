import errorWindowAsString from './error-window.html';
import getHtmlFromString from '../../utilites/getHtmlFromString';

export default function getErrorWindow(
  innerText: string,
  parentElement: HTMLElement
) {
  const errorWindow = getHtmlFromString(errorWindowAsString).querySelector(
    '.error-message'
  ) as HTMLSpanElement;
  errorWindow.innerText = innerText;
  errorWindow.addEventListener('click', () =>
    parentElement.removeChild(errorWindow)
  );
  return errorWindow;
}
