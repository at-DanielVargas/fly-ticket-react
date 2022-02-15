
import { BrowserRouter, Routes as Collection, Route } from 'react-router-dom'
import { ProtectedRoute } from '@core'
import { App, Home, Cart, Reservations, Confirm, Auth, Login, Flights, Passengers, Seats } from '@screens'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Collection>
        <Route path='/' element={<App />}>
          <Route path='' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='reservation' element={<Reservations />}>
            <Route path='flights/:mode' element={<Flights />} />
            <Route path='passengers' element={<Passengers />} />
            <Route path='seats' element={<Seats />} />
            <Route
              path='confirm'
              element={
                <ProtectedRoute redirectTo='/auth/login'>
                  <Confirm />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path='/auth' element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Login />} />
        </Route>
        <Route path='*' element={<Home />} />
      </Collection>
    </BrowserRouter>
  )
}
