import { CitiesService } from '@services'

export const CitiesActionTypes = {
  SEARCH_CITIES_REQUEST: '@cities/SEARCH_CITIES_REQUEST',
  SEARCH_CITIES_SUCCESS: '@cities/SEARCH_CITIES_SUCCESS',
  SEARCH_CITIES_FAILURE: '@cities/SEARCH_CITIES_FAILURE'
}

const search = ( { search } ) => {
  return dispatch => {
    dispatch( {
      type: CitiesActionTypes.SEARCH_CITIES_REQUEST,
      payload: search
    } )
    CitiesService.search( { search } )
      .then( response => {
        dispatch( {
          type: CitiesActionTypes.SEARCH_CITIES_SUCCESS,
          payload: response.data
        } )
      } )
      .catch( error => {
        dispatch( {
          type: CitiesActionTypes.SEARCH_CITIES_FAILURE,
          payload: error
        } )
      } )
  }
}

export const CitiesActions = {
  search
}
