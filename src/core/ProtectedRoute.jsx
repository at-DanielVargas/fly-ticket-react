
import { PropTypes } from 'prop-types'
// import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'
const ProtectedRoute = ( { children, redirectTo } ) => {
  const location = useLocation()
  // const { isAuthenticated } = useSelector(state => state.auth);
  const isAuthenticated = true
  return isAuthenticated ? children : <Navigate to={redirectTo} state={{ from: location }} />
}


ProtectedRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string
}

export { ProtectedRoute }