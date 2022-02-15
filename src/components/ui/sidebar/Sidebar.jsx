
import { Link } from 'react-router-dom'
import { FaHome, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa'
export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/' className='link'>
        <FaHome />
      </Link>

      <Link to='reservations' className='link'>
        <FaCalendarAlt />
      </Link>

      <Link to='cart' className='link'>
        <FaShoppingCart />
      </Link>
    </div>
  )
}
