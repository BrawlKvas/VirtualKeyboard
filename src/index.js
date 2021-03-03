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
  const value = Array.from($keyField.value)
  let posCursor = +$keyField.selectionEnd

  setTimeout(() => {
    $keyField.focus()
    $keyField.selectionEnd = posCursor
  }, 0)

  switch (code) {
    case 'Backspace':
      if (posCursor > 0) {
        posCursor -= 1
        value.splice(posCursor, 1)
      }
      break

    case 'Space':
      value.splice(posCursor, 0, ' ')
      posCursor += 1
      break

    case 'Enter':
      value.splice(posCursor, 0, '\n')
      posCursor += 1
      break

    default:
      value.splice(posCursor, 0, key)
      posCursor += 1
      break
  }

  $keyField.value = value.join('')
})
