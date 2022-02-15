
import { PropTypes } from 'prop-types'

const DropdownItem = ( { children, onClick, isDivider } ) => {
  return (
    <div className={`dropdown-item ${isDivider && 'dropdown-ivider'}`} onClick={onClick}>
      {children}
    </div>
  )
}


DropdownItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  isDivider: PropTypes.bool
}



export  { DropdownItem }