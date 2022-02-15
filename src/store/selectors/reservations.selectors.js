import { RETURN_KEY, DEPARTURE_KEY } from '@constants'

export const ReservationsSelectors = {
  selectCurrentReservation: state => state.reservations?.reservation,

  selectPassengers: state => state.reservations?.reservation?.passengers,

  selectDepartureFlight: state => state.reservations?.reservation?.departureFlight,

  selectDepartureFlightSeats: state =>
    state.reservations?.reservation.departureFlight?.seats.flat().filter( seat => seat.available ),

  selectReturnFlightSeats: state =>
    state.reservations?.reservation.departureFlight?.seats.flat().filter( seat => seat.available ),

  selectDepartureFlightSeatsRows: state => state.reservations?.reservation.departureFlight?.seats,

  selectReturnFlightSeatsRows: state => state.reservations?.reservation.departureFlight?.seats,

  selectReturnFlight: state => state.reservations?.reservation?.returnFlight,

  selectFlightMode: state => state.reservations?.reservation?.flightMode,

  selectDeparturePasengersSeats: state =>
    state.reservations?.reservation?.passengers
      .map( passenger => passenger.seats.filter( seat => seat.type === DEPARTURE_KEY ) )
      .flat(),
  selectReturnPassengersSeats: state =>
    state.reservations?.reservation?.passengers
      .map( passenger => passenger.seats.filter( seat => seat.type === RETURN_KEY ) )
      .flat()
}
