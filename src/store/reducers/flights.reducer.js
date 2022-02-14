import { FlightsActionTypes } from '../actions/flights.actions';

const initialState = {
    loading: false,
    list: [],
    departure: null,
    return: null,
    query: null,
    error: null
};

export const flightsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FlightsActionTypes.SET_DEPARTURE_FLIGHT:
            return {
                ...state,
                list: [...state.list].filter(flight => flight.id !== action.payload.flight.id),
                departure: action.payload.flight
            };

        case FlightsActionTypes.SET_RETURN_FLIGHT:
            return {
                ...state,
                list: [...state.list].filter(flight => flight.id !== action.payload.flight.id),
                return: action.payload.flight
            };

        case FlightsActionTypes.SEARCH_FLIGHTS:
            return {
                ...state,
                loading: true,
                query: action.payload,
                error: null
            };

        case FlightsActionTypes.SEARCH_FLIGHTS_SUCCESS:
            return {
                ...state,
                list: [...action.payload],
                loading: false,
                error: null
            };

        case FlightsActionTypes.SEARCH_FLIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case FlightsActionTypes.CLEAR:
            return {
                ...state,
                ...initialState
            };

        default:
            return state;
    }
};
