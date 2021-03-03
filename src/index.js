import VirtualKeyboard from './modules/VirtualKeyboard'
import { createElement } from './utils'
import './index.css'

const $keyField = createElement('textarea', 'keyField')
const keyboard = new VirtualKeyboard('.keyboard')

document.body.append($keyField)
document.body.append(keyboard.getInsertElement())

keyboard.init({ dPhysicalKeyboard: true })

// key - символ
// code - стандартный код кнопки (пример: KeyA) независимый от алфавита
keyboard.subscribe('input', ({ key, code }) => {
  setTimeout(() => $keyField.focus(), 0)

  switch (code) {
    case 'Backspace':
      $keyField.value = $keyField.value.slice(0, -1)
      break

    case 'Space':
      $keyField.value += ' '
      break

    case 'Enter':
      $keyField.value += '\n'
      break

    default:
      $keyField.value += key
      break
  }
})
