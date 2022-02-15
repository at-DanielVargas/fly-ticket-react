// polyfill custom para guardar los nombres de event listeners y poder verificar si el elemento target tiene un listener
let _addEventListener = EventTarget.prototype.addEventListener
let _removeEventListener = EventTarget.prototype.removeEventListener
EventTarget.prototype.events = {}
EventTarget.prototype.addEventListener = function ( name, listener ) {
  let events = EventTarget.prototype.events
  if ( events[name] == null ) {
    events[name] = []
  }

  if ( events[name].indexOf( listener ) === -1 ) {
    events[name].push( listener )
  }

  _addEventListener( name, listener )
}
EventTarget.prototype.removeEventListener = function ( name, listener ) {
  let events = EventTarget.prototype.events

  if ( events[name] != null && events[name].indexOf( listener ) !== -1 ) {
    events[name].splice( events[name].indexOf( listener ), 1 )
  }

  _removeEventListener( name, listener )
}
EventTarget.prototype.hasEventListener = function ( name ) {
  let events = EventTarget.prototype.events
  if ( events[name] == null ) {
    return false
  }

  return events[name].length
}
