import { RestService } from '@services'

const create = ( { reservation } ) => {
  return RestService.post( '/reservations', { reservation } )
}

const read = id => {
  return RestService.get( `/reservations/${id ? id : ''}` )
}

const update = ( { reservation } ) => {
  return RestService.put( `/reservations/${reservation.id}`, { reservation } )
}

const _delete = ( { reservation } ) => {
  return RestService.delete( `/reservations/${reservation.id}` )
}

export const ReservationsService = {
  create,
  read,
  update,
  _delete
}
