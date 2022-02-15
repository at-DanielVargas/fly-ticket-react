import { CitiesActionTypes } from '../actions/cities.actions'

const initialState = {
  suggestions: [],
  loading: false,
  error: null
}

export const citiesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
  case CitiesActionTypes.SEARCH_CITIES_REQUEST:
    return {
      ...state,
      loading: true,
      suggestions: [],
      error: null
    }
  case CitiesActionTypes.SEARCH_CITIES_SUCCESS:
    return {
      ...state,
      suggestions: action.payload,
      loading: false,
      error: null
    }
  case CitiesActionTypes.SEARCH_CITIES_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  default:
    return state
  }
}
