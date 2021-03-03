import VirtualKeyboard from './modules/VirtualKeyboard'
import { createElement } from './utils'
import './index.css'

const $keyField = createElement('textarea', 'keyField')
const keyboard = new VirtualKeyboard('.keyboard')

document.body.append($keyField)
document.body.append(keyboard.getInsertElement())

keyboard.init({ dPhysicalKeyboard: true })

// ПРИМЕР РАБОТЫ С ВИРТУАЛЬНОЙ КЛАВИАТУРОЙ
// key - символ
// code - стандартный код кнопки (пример: KeyA) независимый от алфавита
keyboard.subscribe('input', ({ key, code }) => {
  const posCursor = +$keyField.selectionEnd
  const value = Array.from($keyField.value)

  setTimeout(() => {
    $keyField.focus()
    $keyField.selectionEnd = posCursor + 1
  }, 0)

  switch (code) {
    case 'Backspace':
      value.splice(posCursor - 1, 1)
      break

    case 'Space':
      value.splice(posCursor, 0, ' ')
      break

    case 'Enter':
      value.splice(posCursor, 0, '\n')
      break

    default:
      value.splice(posCursor, 0, key)
      break
  }

  $keyField.value = value.join('')
})
