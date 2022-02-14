const selectSearchFlightsResults = state => state.flights.list;

const selectSearchLoadingState = state => state.flights.loading;

const selectSearchLoadingErrors = state => state.flights.error;

const selectLastSearch = state => state.flights.query;

const selectDepartureFlight = state => state.flights.departure;

const selectReturnFlight = state => state.flights.return;

const selectPassengers = state => state.flights.query.passengers;

export const FlightsSelectors = {
    selectSearchFlightsResults,
    selectSearchLoadingState,
    selectSearchLoadingErrors,
    selectLastSearch,
    selectDepartureFlight,
    selectReturnFlight,
    selectPassengers
};
