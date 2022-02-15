import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { citiesReducer } from './reducers/cities.reducer'
import { flightsReducer } from './reducers/flights.reducer'
import { authReducer } from './reducers/auth.reducer'
import { reservationsReducer } from './reducers/reservations.reducer'
import thunk from 'redux-thunk'

//reducers
export * from './reducers/cities.reducer'
export * from './reducers/flights.reducer'
export * from './reducers/auth.reducer'
export * from './reducers/reservations.reducer'
// actions
export * from './actions/cities.actions'
export * from './actions/flights.actions'
export * from './actions/auth.actions'
export * from './actions/reservations.actions'
//selectors
export * from './selectors/reservations.selectors'
export * from './selectors/auth.selectors'
export * from './selectors/flights.selectors'
export * from './selectors/cities.selectors'

// store
const reducer = combineReducers( {
  cities: citiesReducer,
  flights: flightsReducer,
  reservations: reservationsReducer,
  auth: authReducer
} )

export const store = createStore( reducer, composeWithDevTools( applyMiddleware( thunk ) ) )
