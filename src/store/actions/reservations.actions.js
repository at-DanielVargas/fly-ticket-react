import { ReservationsService } from '@services';
import { FlightsActions } from '@store';

export const ReservationsActionTypes = {
    GET_RESERVATIONS: '@reservations/GET_RESERVATIONS',
    GET_RESERVATIONS_SUCCESS: '@reservations/GET_RESERVATIONS_SUCCESS',
    GET_RESERVATIONS_FAILURE: '@reservations/GET_RESERVATIONS_FAILURE',

    CREATE: '@reservations/CREATE',
    CREATE_SUCCESS: '@reservations/CREATE_SUCCESS',
    CREATE_FAILURE: '@reservations/CREATE_FAILURE',

    READ: '@reservations/READ',
    READ_SUCCESS: '@reservations/READ_SUCCESS',
    READ_FAILURE: '@reservations/READ_FAILURE',

    UPDATE: '@reservations/UPDATE',
    UPDATE_SUCCESS: '@reservations/UPDATE_SUCCESS',
    UPDATE_FAILURE: '@reservations/UPDATE_FAILURE',

    DELETE: '@reservations/DELETE',
    DELETE_SUCCESS: '@reservations/DELETE_SUCCESS',
    DELETE_FAILURE: '@reservations/DELETE_FAILURE',

    CREATE_LOCAL: '@reservations/CREATE_LOCAL',
    READ_LOCAL: '@reservations/READ_LOCAL',
    UPDATE_LOCAL: '@reservations/UPDATE_LOCAL',
    DELETE_LOCAL: '@reservations/DELETE_LOCAL',

    SELECT_FLIGHT: '@reservations/SELECT_FLIGHT',
    UPDATE_PASSENGERS: '@reservations/UPDATE_PASSENGERS',

    CLEAR: '@reservations/CLEAR'
};

const clear = () => {
    return {
        type: ReservationsActionTypes.CLEAR
    };
};

const setFlight = ({ flight, type }) => {
    // type: 'departure' or 'return'
    return (dispatch, state) => {
        const { flights } = state();
        if (flights.query.flightType === 'roundtrip') {
            const { returnDate: departureDate, arrival: departure, departure: arrival, passengers } = flights.query;
            dispatch(FlightsActions.search({ departure, arrival, departureDate, passengers }));
        }
        dispatch({
            type: ReservationsActionTypes.SELECT_FLIGHT,
            payload: { flight, type }
        });
    };
};

const updatePassengers = ({ passengers }) => {
    return dispatch => {
        dispatch({
            type: ReservationsActionTypes.UPDATE_PASSENGERS,
            payload: passengers
        });
    };
};

const createLocal = ({ reservation }) => {
    return dispatch => {
        dispatch({
            type: ReservationsActionTypes.CREATE_LOCAL,
            payload: reservation
        });
    };
};

const updateLocal = ({ reservation }) => {
    return dispatch => {
        dispatch({
            type: ReservationsActionTypes.UPDATE_LOCAL,
            payload: reservation
        });
    };
};

const create = ({ reservation }) => {
    return dispatch => {
        dispatch({
            type: ReservationsActionTypes.CREATE
        });
        ReservationsService.create({ reservation })
            .then(response => {
                dispatch({
                    type: ReservationsActionTypes.CREATE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: ReservationsActionTypes.CREATE_FAILURE,
                    payload: error
                });
            });
    };
};

const read = () => {
    return async dispatch => {
        dispatch({
            type: ReservationsActionTypes.READ
        });
        ReservationsService.read()
            .then(response => {
                dispatch({
                    type: ReservationsActionTypes.READ_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: ReservationsActionTypes.READ_FAILURE
                });
            });
    };
};

const update = ({ reservation }) => {
    return dispatch => {
        dispatch({ type: ReservationsActionTypes.UPDATE });
        ReservationsService.update({ reservation })
            .then(response => {
                dispatch({
                    type: ReservationsActionTypes.UPDATE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: ReservationsActionTypes.UPDATE_FAILURE,
                    payload: error
                });
            });
    };
};

const del = ({ reservation }) => {
    return dispatch => {
        dispatch({ type: ReservationsActionTypes.DELETE });
        ReservationsService._delete({ reservation })
            .then(response => {
                dispatch({
                    type: ReservationsActionTypes.DELETE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: ReservationsActionTypes.DELETE_FAILURE,
                    payload: error
                });
            });
    };
};

export const ReservationActions = {
    create,
    read,
    update,
    del,
    createLocal,
    updateLocal,
    updatePassengers,
    setFlight,
    clear
};
