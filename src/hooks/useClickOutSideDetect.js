import { useEffect, useCallback } from 'react'

export const useClickOutSideDetect = ( ref, callback ) => {
  const clickOutside = useCallback(
    event => {
      if ( ref.current && !ref.current.contains( event.target ) ) {
        callback()
      }
    },
    [ref, callback]
  )

  useEffect( () => document.addEventListener( 'mousedown', clickOutside ) )

  return () => document.removeEventListener( 'mousedown', clickOutside )
}
