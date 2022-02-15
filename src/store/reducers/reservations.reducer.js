import { ReservationsActionTypes } from '../actions/reservations.actions'

const initialState = {
  loading: false,
  reservations: [],
  reservation: {
    extras: [],
    passengers: [],
    departureFlight: null,
    returnFlight: null,
    flightMode: ''
  },
  error: null
}

export const reservationsReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
  case ReservationsActionTypes.CLEAR:
    return {
      ...state,
      ...initialState
    }

  case ReservationsActionTypes.SET_FLIGHT_MODE:
    return {
      ...state,
      reservation: {
        ...state.reservation,
        flightMode: action.payload
      }
    }

  case ReservationsActionTypes.SELECT_FLIGHT:
    if ( action.payload.type === 'departure' ) {
      return {
        ...state,
        reservation: {
          ...state.reservation,
          departureFlight: action.payload.flight
        }
      }
    } else {
      return {
        ...state,
        reservation: {
          ...state.reservation,
          returnFlight: action.payload.flight
        }
      }
    }

  case ReservationsActionTypes.UPDATE_PASSENGERS:
    return {
      ...state,
      reservation: {
        ...state.reservation,
        passengers: action.payload
      }
    }

  case ReservationsActionTypes.CREATE_LOCAL:
    return {
      ...state,
      reservation: action.payload.reservation
    }

  case ReservationsActionTypes.UPDATE_LOCAL:
    return {
      ...state,
      reservation: action.payload
    }

  case ReservationsActionTypes.CREATE:
    return {
      ...state,
      loading: true
    }
  case ReservationsActionTypes.CREATE_SUCCESS:
    return {
      ...state,
      loading: false,
      reservations: [...state.reservations, action.payload]
    }

  case ReservationsActionTypes.CREATE_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  case ReservationsActionTypes.READ:
    return {
      ...state,
      loading: true
    }
  case ReservationsActionTypes.READ_SUCCESS:
    return {
      ...state,
      loading: false,
      reservations: action.payload
    }
  case ReservationsActionTypes.READ_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    }

  default:
    return state
  }
}
