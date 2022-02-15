import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineTicket } from 'react-icons/hi'
import { MdAirplaneTicket } from 'react-icons/md'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container d-flex'>
        <div className='left'>
          <span className='icon'>
            <Link to='/'>
              <HiOutlineTicket />
              <MdAirplaneTicket className='text-primary' />
            </Link>
          </span>
          <Link to='/' className='name'>
                        Fly<span className='txt-purple'>Ticket</span>
          </Link>
          <nav>
            <Link to='/'>Reservar</Link>
            <Link to='/'>Información</Link>
            <Link to='/'>Mi reserva</Link>
          </nav>
        </div>
        <div className='right'>
          <nav>
            <Link to='/auth/login'>Iniciar sesión</Link>
            <Link to='/'>Registro</Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
