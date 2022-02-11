import errorWindowAsString from './error-window.html';
import geHtmlFromString from '../../utilites/geHtmlFromString';

export default function getErrorWindow(
  innerText: string,
  parentElement: HTMLElement
) {
  const errorWindow = geHtmlFromString(errorWindowAsString).querySelector(
    '.error-message'
  ) as HTMLSpanElement;
  errorWindow.innerText = innerText;
  errorWindow.addEventListener('click', () =>
    parentElement.removeChild(errorWindow)
  );
  return errorWindow;
}
