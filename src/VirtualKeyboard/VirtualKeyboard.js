import keyLayouts from './KeyLayouts'

import './VirtualKeyboard.css'

class VirtualKeyboard {
  constructor() {
    this.$keyboard = document.createElement('div')
    this.$keyboard.classList = 'keyboard'

    this.pressedButtons = new Set() //! Зажатые клавиши физ. клавиатуры

    this.language = 'ru'

    this.isCapsLock = false
    this.isShiftLeft = false
    this.isShiftRight = false

    this.init()
  }

  init() {
    window.addEventListener('keydown', this.keyUpDownHandler.bind(this))
    window.addEventListener('keyup', this.keyUpDownHandler.bind(this))
    this.$keyboard.addEventListener('mousedown', this.clickHandler.bind(this))
    this.render()
  }

  keyUpDownHandler({ code, repeat, type }) {
    if (repeat) { return }

    const isKeyDown = type === 'keydown'

    if (isKeyDown) {
      this.pressedButtons.add(code)
    } else {
      this.pressedButtons.delete(code)
    }

    // ?
    if (code === 'ShiftLeft') {
      this.isShiftLeft = isKeyDown
      this.render()
      return
    }

    if (code === 'ShiftRight') {
      this.isShiftRight = isKeyDown
      this.render()
      return
    }

    const btn = this.$keyboard.querySelector(`[data-code="${code}"]`)

    if (!btn) { return }

    btn.classList.toggle('press', isKeyDown)
  }

  clickHandler({ target }) {
    const { code } = target.dataset

    if (!code) { return }

    switch (code) {
      case 'Lang':
        this.toggleLanguage()
        break

      case 'CapsLock':
        this.toggleCapsLock()
        break

      case 'ShiftRight':
      case 'ShiftLeft':
        if (!this.pressedButtons.has(code)) {
          this['is' + code] = !this['is' + code]
          this.render()
        }
        break

      case 'Backspace':
      case 'Enter':
      case 'Space':
      case 'Tab':
        break

      default: {
        // const isUpperCase = this.isCapsLock || this.isShiftLeft || this.isShiftRight
        break
      }
    }
  }

  toggleCapsLock() {
    const $capsLock = this.$keyboard.querySelector('[data-code="CapsLock"]')

    this.isCapsLock = !this.isCapsLock
    $capsLock.classList.toggle('active', this.isCapsLock)
  }

  toggleLanguage() {
    this.language = this.language === 'ru' ? 'en' : 'ru'
    this.render()
  }

  // setLanguage(abbrev) {
  //   if (abbrev in keyLayouts) {
  //     this.language = abbrev
  //     this.render()
  //   } else {
  //     console.error(`Abbreviation ${abbrev} not found`)
  //   }
  // }

  render() {
    let html = ''

    keyLayouts[this.language].forEach(row => {
      html += '<div class="keyboard__row">'
      row.forEach(({ code, keys }) => {
        const isShift = this.isShiftLeft || this.isShiftRight

        const key = isShift && keys[1] ? keys[1] : keys[0]

        let cl = `keyboard__key ${code}`

        // ?
        cl += this.pressedButtons.has(code) ? ' press' : ''
        cl += code === 'CapsLock' && this.isCapsLock ? ' active' : ''
        cl += code === 'ShiftLeft' && this.isShiftLeft ? ' press' : ''
        cl += code === 'ShiftRight' && this.isShiftRight ? ' press' : ''

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
