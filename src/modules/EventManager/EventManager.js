class EventManager {
  constructor() {
    this.listeners = []
  }

  subscribe(eventType, func) {
    this.listeners.push({ eventType, func })
  }

  unsubscribe(eventType, func) {
    this.listeners = this.listeners.filter(item => {
      return item.func !== func || item.eventType !== eventType
    })
  }

  notify(eventType, data) {
    this.listeners.forEach(listener => {
      if (listener.eventType === eventType) {
        listener.func(data)
      }
    })
  }
}

export default EventManager
