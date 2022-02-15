import  { forwardRef } from 'react'
import { PropTypes } from 'prop-types'

const Button = forwardRef( ( { children, onClick, color = 'primary', className = '', type }, ref ) => {
  return (
    <button ref={ref} type={type} className={`button ${color} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
} )


Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
}

export  { Button }