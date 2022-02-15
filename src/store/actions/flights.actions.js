import { FlightsService } from '@services'
import { ReservationActions } from './reservations.actions'

export const FlightsActionTypes = {
  SEARCH_FLIGHTS: '@flights/SEARCH_FLIGHTS',
  SEARCH_FLIGHTS_SUCCESS: '@flights/SEARCH_FLIGHTS_SUCCESS',
  SEARCH_FLIGHTS_FAILURE: '@flights/SEARCH_FLIGHTS_FAILURE',

  STORE_SEARCH_QUERY: '@flights/STORE_SEARCH_QUERY',

  SET_DEPARTURE_FLIGHT: '@flights/SET_DEPARTURE_FLIGHT',
  SET_RETURN_FLIGHT: '@flights/SET_RETURN_FLIGHT',

  CLEAR: '@flights/CLEAR'
}

const clear = () => {
  return {
    type: FlightsActionTypes.CLEAR
  }
}

const search = ( { departure, arrival, departureDate, returnDate, arrivalDate, passengers, flightType } ) => {
  return dispatch => {
    dispatch( {
      type: FlightsActionTypes.SEARCH_FLIGHTS,
      payload: { departure, arrival, departureDate, arrivalDate, passengers, flightType, returnDate }
    } )

    FlightsService.search( { departure, arrival, departureDate, arrivalDate, passengers } )
      .then( response => {
        // actualiza la lista de vuelos encontrados
        dispatch( {
          type: FlightsActionTypes.SEARCH_FLIGHTS_SUCCESS,
          payload: response.data.flights
        } )
        // guarda el modo de vuelo redondo o simple
        dispatch( ReservationActions.setFlightMode( { flightMode: flightType } ) )
        // guarda los pasajeros seleccionados en la busqueda
        dispatch( ReservationActions.updatePassengers( { passengers } ) )
      } )
      .catch( error => {
        dispatch( {
          type: FlightsActionTypes.SEARCH_FLIGHTS_FAILURE,
          payload: error
        } )
      } )
  }
}

export const FlightsActions = {
  search,
  clear
}
