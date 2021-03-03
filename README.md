# Виртуальная клавиатура

***

### Доступные методы

***

* Метод ```getInsertElement``` возвращает HTML элемент виртуальной клавиатуры для дальнейшей вставки в документ

* Метод ```init``` инициализирует виртуальную клвиатуру (добавление слушателей событий + визуализация (render) виртуальной клавиатуры).

  + Параметр ```dPhysicalKeyboard``` включает/выключает отображение нажатий на физическую клавиатуру

``` js
const keyboard = new VirtualKeyboard()
document.body.append(keyboard.getInsertElement())

keyboard.init({
    dPhysicalKeyboard: true
}) // 
```

* Методы ```subscribe``` и ```unsubscribe``` позволяют подписать/отписаться от [событий](#События) виртуальной клавиатуры

``` JS
const keyboard = new VirtualKeyboard()
document.body.append(keyboard.getInsertElement())

const handler = (e) => {
    console.log(e) // {code: KeyF, key: f}

    keyboard.unsubscribe('keydown', handler)
}

keyboard.subscribe('keydown', handler)
```

* Метод ```toggleCapsLock``` переключает значение Capslock виртуальной клавиатуры

* Метод ```toggleLanguage``` переключает язык виртуальной клавиатуры

### События

* Событие ```keydown``` срабатывает при нажатии любых кнопок на виртуальной клавиатуре.

* Событие ```input``` срабатывает при нажатии на клавиши:
  + Все буквы и символы
  + Enter, Space, Backspace
