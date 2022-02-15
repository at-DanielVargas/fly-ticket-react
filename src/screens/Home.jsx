import  { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Features, SearchForm } from '@components'
import { FlightsActions, ReservationActions } from '@store'
import { useEffect } from 'react'

export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect( () => {
    dispatch( FlightsActions.clear() )
    dispatch( ReservationActions.clear() )
  }, [] )

  const handleSearch = search => {
    dispatch( FlightsActions.search( search ) )
    navigate( `/reservation/flights/${search.flightType}` )
  }

  return (
    <Fragment>
      <section className='block-section bg-wash'>
        <div className='container-lg'>
          <div className='row flex a-items-center'>
            <div className='col-12 col-md-6'>
              <div className='pr-md-8'>
                <div>
                  <h1>Lorem ipsum dolor sit amet.</h1>
                  <h4>
                                        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                        himenaeos. Nunc non dignissim ipsum
                  </h4>
                </div>
                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris.
                </p>
              </div>
            </div>

            <div className='col-12 col-md-6'>
              <img
                src='https://chisnghiax.com/chisfis/static/media/hero-right.ee78c0ffae92062cbe4e.png'
                width='100%'
                alt='hero-right'
              />
            </div>
            <div className='col-8 col-offest-2'>
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>
      <Features />
    </Fragment>
  )
}
