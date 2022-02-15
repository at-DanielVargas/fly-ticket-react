
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import { Navbar } from './Navbar'

describe( 'Navbar Component', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow( <Navbar /> )
  } )

  test( 'should be render Navbar component ', () => {
    expect( wrapper ).toMatchSnapshot()
  } )
} )
