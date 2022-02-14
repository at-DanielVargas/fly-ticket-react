const selectCurrentReservation = state => state.reservations.reservation;

const selectPassengers = state => state.reservations.reservation?.passengers;

const selectDepartureFlight = state => state.reservations.reservation.departureFlight;

const selectReturnFlight = state => state.reservations.reservation.returnFlight;

export const ReservationsSelectors = {
    selectCurrentReservation,
    selectDepartureFlight,
    selectReturnFlight,
    selectPassengers
};
