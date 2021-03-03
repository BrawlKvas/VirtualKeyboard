export const createElement = (tag = 'div', classes) => {
  const $elem = document.createElement(tag)
  $elem.classList = classes
  return $elem
}
