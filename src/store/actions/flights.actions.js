import { FlightsService } from '@services';
import { ReservationsActionTypes } from './reservations.actions';

export const FlightsActionTypes = {
    SEARCH_FLIGHTS: '@flights/SEARCH_FLIGHTS',
    SEARCH_FLIGHTS_SUCCESS: '@flights/SEARCH_FLIGHTS_SUCCESS',
    SEARCH_FLIGHTS_FAILURE: '@flights/SEARCH_FLIGHTS_FAILURE',

    SET_DEPARTURE_FLIGHT: '@flights/SET_DEPARTURE_FLIGHT',
    SET_RETURN_FLIGHT: '@flights/SET_RETURN_FLIGHT',

    CLEAR: '@flights/CLEAR'
};

const clear = () => {
    return {
        type: FlightsActionTypes.CLEAR
    };
};

const setDepartureFlight = ({ flight }) => {
    return dispatch => {
        dispatch({
            type: FlightsActionTypes.SET_DEPARTURE_FLIGHT,
            payload: { flight }
        });
    };
};

const setReturnFlight = ({ flight }) => {
    return dispatch => {
        dispatch({
            type: FlightsActionTypes.SET_RETURN_FLIGHT,
            payload: { flight }
        });
    };
};

const search = ({ departure, arrival, departureDate, returnDate, arrivalDate, passengers, flightType }) => {
    return (dispatch, state) => {
        dispatch({
            type: FlightsActionTypes.SEARCH_FLIGHTS,
            payload: { departure, arrival, departureDate, arrivalDate, passengers, flightType, returnDate }
        });
        FlightsService.search({ departure, arrival, departureDate, arrivalDate, passengers })
            .then(response => {
                dispatch({
                    type: FlightsActionTypes.SEARCH_FLIGHTS_SUCCESS,
                    payload: response.data.flights
                });
            })
            .catch(error => {
                dispatch({
                    type: FlightsActionTypes.SEARCH_FLIGHTS_FAILURE,
                    payload: error
                });
            });
    };
};

export const FlightsActions = {
    search,
    setDepartureFlight,
    setReturnFlight,
    clear
};
