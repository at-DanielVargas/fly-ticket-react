import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLongArrowAltLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string } from 'yup'
import { AuthActions, AuthSelectors } from '@store'

const SocialIcons = () => {
  return (
    <div className='social-container'>
      <a
        href={'https://facebook.com'}
        className='social'
        target='popup'
        onClick={() => window.open( 'http://kanishkkunal.com', 'popup', 'width=600,height=600' )}
      >
        <FaFacebookF />
      </a>
      <a
        href={'https://twitter.com'}
        className='social'
        target='popup'
        onClick={() => window.open( 'http://kanishkkunal.com', 'popup', 'width=600,height=600' )}
      >
        <FaTwitter />
      </a>
      <a
        href={'https://linkedin.com'}
        className='social'
        target='popup'
        onClick={() => window.open( 'http://kanishkkunal.com', 'popup', 'width=600,height=600' )}
      >
        <FaLinkedinIn />
      </a>
    </div>
  )
}

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginRequestStatus = useSelector( AuthSelectors.selectLoginRequestStatus )
  const isAuthenticated = useSelector( AuthSelectors.selectAuthState )

  useEffect( () => {
    if ( isAuthenticated ) {
      navigate( '/reservations' )
    }
  }, [loginRequestStatus] )

  const [state, setState] = useState()

  const credentials = {
    email: '',
    password: ''
  }
  const credentialsValidation = object( {
    email: string().required( 'El email es requerido' ),
    password: string().required( 'La contraseña es requerida' )
  } )

  const handleLoginForm = ( values, { resetForm } ) => {
    if ( values ) {
      dispatch( AuthActions.login( values ) )
    }
    resetForm()
  }

  return (
    <div className='login-wrapper'>
      <div className={`auth-container ${state}`} id='container'>
        <div className='auth-header'>
          <Link to='/'>
            <FaLongArrowAltLeft /> Regresar
          </Link>
        </div>
        <div className='login-form-container sign-up-container'>
          <form action='#'>
            <h1>Crear cuenta</h1>
            <span>Registrate con</span>
            <SocialIcons />
            <span>o usa un usuario y contraseña</span>
            <input type='email' placeholder='Email' />
            <input type='password' placeholder='Password' />
            <a href='#'>Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className='login-form-container sign-in-container'>
          <Formik
            initialValues={credentials}
            validationSchema={credentialsValidation}
            onSubmit={handleLoginForm}
          >
            {( { isSubmitting } ) => (
              <>
                <Form>
                  <h1>Inicia sesión</h1>
                  <span>con</span>
                  <SocialIcons />
                  <span>o utiliza tu usuario y ccontraseña</span>
                  <div className='mv-2'>
                    <Field type='text' placeholder='Email' name='email' />
                    <ErrorMessage name='email' component='small' className='txt-red' />
                  </div>

                  <div className='mv-2'>
                    <Field type='password' placeholder='Contraseña' name='password' />
                    <ErrorMessage name='password' component='small' className='txt-red' />
                  </div>

                  <div className='mv-2'>
                    <button className='button-ghost-magenta' type='submit' disabled={isSubmitting}>
                      {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Hey Bienvenido!</h1>
              <p>¿Ya tienes cuenta? inicia sesión dando click aquí</p>
              <button className='button-ghost-wash' id='signIn' onClick={() => setState( '' )}>
                                Iniciar sesión
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Eres nuevo</h1>
              <p>Registrarte para conseguir miles de ofertas</p>
              <button
                className='button-ghost-wash'
                id='signUp'
                onClick={() => setState( 'right-panel-active' )}
              >
                                Registrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
