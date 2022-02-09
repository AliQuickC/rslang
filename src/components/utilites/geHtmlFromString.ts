export default function geHtmlFromString(htmlFromString: string) {
  const template = document.createElement('template');
  template.innerHTML = htmlFromString;
  return template.content as DocumentFragment;
}
