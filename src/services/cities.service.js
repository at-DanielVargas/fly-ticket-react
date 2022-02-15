import { RestService } from '@services'

const search = ( { search } ) => {
  return RestService.get( '/cities?_expand=state', {
    params: {
      q: search
    }
  } )
}

export const CitiesService = {
  search
}
