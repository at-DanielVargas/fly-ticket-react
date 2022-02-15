import  { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'

const Counter = ( { onChange, name } ) => {
  const [count, setCount] = useState( 0 )
  const ref = useRef( 0 )

  useEffect( () => {
    if ( onChange ) {
      onChange( { target: { name, value: count } } )
      ref.current.value = count
    }
  }, [count] )

  const increment = () => {
    setCount( count + 1 )
  }

  const decrement = () => {
    if ( count > 0 ) {
      setCount( count - 1 )
    }
  }

  return (
    <div className='d-flex a-items-center'>
      <button className='button-sm mr-3' type='button' onClick={decrement}>
                -
      </button>
      <input className='input-sm' type='text' ref={ref} readOnly />
      <button className='button-sm ml-3' type='button' onClick={increment}>
                +
      </button>
    </div>
  )
}

Counter.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string
}

export  { Counter }