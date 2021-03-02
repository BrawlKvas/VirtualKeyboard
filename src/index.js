import VirtualKeyboard from './VirtualKeyboard'
import './index.css'

const keyboard = new VirtualKeyboard('.keyboard')

document.body.append(keyboard.getInsertElement())
