import EventManager from '../EventManager'
import keyLayouts from './KeyLayouts'
import { createElement } from '../../utils'

import * as C from './constants'

import './VirtualKeyboard.css'

class VirtualKeyboard extends EventManager {
  constructor() {
    super()

    this.$keyboard = createElement('div', 'keyboard')

    this.pressedButtons = new Set()

    this.language = 'ru'

    this.isCapsLock = false
    this.isShiftLeft = false
    this.isShiftRight = false
  }

  init({ dPhysicalKeyboard = true } = {}) {
    if (dPhysicalKeyboard) {
      window.addEventListener('keydown', this.keyUpDownHandler.bind(this))
      window.addEventListener('keyup', this.keyUpDownHandler.bind(this))
    }
    this.$keyboard.addEventListener('mousedown', this.clickHandler.bind(this))
    this.render()
  }

  keyUpDownHandler({ repeat, type, code }) {
    if (repeat) { return }

    const isKeyDown = type === 'keydown'

    if (isKeyDown) {
      this.pressedButtons.add(code)
    } else {
      this.pressedButtons.delete(code)
    }

    if (code === C.SHIFT_LEFT_CODE || code === C.SHIFT_RIGHT_CODE) {
      this[`is${code}`] = isKeyDown
      this.render()
      return
    }

    const btn = this.$keyboard.querySelector(`[data-code="${code}"]`)

    if (btn) {
      btn.classList.toggle('press', isKeyDown)
    }
  }

  clickHandler({ target }) {
    const { code, key } = target.dataset

    if (!code) { return }

    switch (code) {
      case C.LANG_CODE:
        this.notify('keydown', { key, code })
        this.toggleLanguage()
        break

      case C.CAPSLOCK_CODE:
        this.notify('keydown', { key, code })
        this.toggleCapsLock()
        break

      case C.SHIFT_RIGHT_CODE:
      case C.SHIFT_LEFT_CODE:
        this.notify('keydown', { key, code })
        if (!this.pressedButtons.has(code)) {
          this['is' + code] = !this['is' + code]
          this.render()
        }
        break

      case C.TAB_CODE:
        this.notify('keydown', { key, code })
        break

      case C.BACKSPACE_CODE:
      case C.ENTER_CODE:
      case C.SPACE_CODE:
        this.notify('keydown', { key, code })
        this.notify('input', { key, code })
        break

      default: {
        const isUpperCase = this.isCapsLock || this.isShiftLeft || this.isShiftRight

        const data = {
          key: isUpperCase ? key.toUpperCase() : key,
          code
        }

        this.notify('keydown', data)
        this.notify('input', data)
        break
      }
    }
  }

  toggleCapsLock() {
    const $capsLock = this.$keyboard.querySelector(`[data-code="${C.CAPSLOCK_CODE}"]`)

    this.isCapsLock = !this.isCapsLock
    $capsLock.classList.toggle('active', this.isCapsLock)
  }

  toggleLanguage() {
    this.language = this.language === 'ru' ? 'en' : 'ru'
    this.render()
  }

  setLanguage(abbrev) {
    if (abbrev in keyLayouts) {
      this.language = abbrev
      this.render()
    } else {
      throw new Error(`Abbreviation "${abbrev}" is not found`)
    }
  }

  render() {
    let html = ''

    keyLayouts[this.language].forEach(row => {
      html += '<div class="keyboard__row">'
      row.forEach(({ code, keys }) => {
        const isShift = this.isShiftLeft || this.isShiftRight

        const key = isShift && keys[1] ? keys[1] : keys[0]

        let cl = `keyboard__key ${code}`

        cl += this.pressedButtons.has(code) ? ' press' : ''
        cl += code === C.CAPSLOCK_CODE && this.isCapsLock ? ' active' : ''
        cl += code === C.SHIFT_LEFT_CODE && this.isShiftLeft ? ' press' : ''
        cl += code === C.SHIFT_RIGHT_CODE && this.isShiftRight ? ' press' : ''

        html += `
          <button class="${cl}" data-key='${key}' data-code='${code}'>${key}</button>
        `
      })
      html += '</div>'
    })

    this.$keyboard.innerHTML = html
  }

  getInsertElement() { return this.$keyboard }
}

export default VirtualKeyboard
