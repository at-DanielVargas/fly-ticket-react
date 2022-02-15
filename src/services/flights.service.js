import { RestService } from '@services'

const search = ( { departure, arrival, departureDate, arrivalDate } ) => {
  return RestService.get( '/flights', {
    params: {
      departure,
      arrival,
      departureDate,
      arrivalDate
    }
  } )
}

export const FlightsService = {
  search
}
