import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import { useBodyClass } from '@hooks'

const Modal = ( { children, onClose, show, title, scollable = false } ) => {
  useBodyClass( `${show ? 'modal_open' : null}` )
  const [state, setState] = useState( 'closed' ) // closed, opening, open, closing
  useEffect( () => {
    if ( show ) {
      setState( 'opening' )
      setTimeout( () => {
        setState( 'open' )
      }, 400 )
    } else {
      setState( 'closing' )
      setTimeout( () => {
        setState( 'closed' )
      }, 400 )
    }
  }, [show] )

  if ( !children || show === false ) return null
  return (
    <div className={`modal ${state}`}>
      <div className='modal_content'>
        <div className='modal_header'>
          <h2>{title}</h2>
          <span className='close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={`modal_body ${scollable && 'scrollable'}`}>{children}</div>
        <div className='modal_footer'>
          <button className='close' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}


Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  scollable: PropTypes.bool
}

export { Modal }