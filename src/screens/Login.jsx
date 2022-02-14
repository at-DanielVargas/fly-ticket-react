import React from 'react';
import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialIcons = () => {
    return (
        <div className='social-container'>
            <a
                href={'https://facebook.com'}
                className='social'
                target='popup'
                onClick={() => window.open('http://kanishkkunal.com', 'popup', 'width=600,height=600')}
            >
                <FaFacebookF />
            </a>
            <a
                href={'https://twitter.com'}
                className='social'
                target='popup'
                onClick={() => window.open('http://kanishkkunal.com', 'popup', 'width=600,height=600')}
            >
                <FaTwitter />
            </a>
            <a
                href={'https://linkedin.com'}
                className='social'
                target='popup'
                onClick={() => window.open('http://kanishkkunal.com', 'popup', 'width=600,height=600')}
            >
                <FaLinkedinIn />
            </a>
        </div>
    );
};

export const Login = () => {
    const [state, setState] = useState();

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
                        <h1>Create Account</h1>
                        <SocialIcons />
                        <span>or use your email for registration</span>
                        <input type='text' placeholder='Name' />
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className='login-form-container sign-in-container'>
                    <form action='#'>
                        <h1>Inicia sesión</h1>
                        <span>con</span>
                        <SocialIcons />
                        <span>o utiliza tu usuario y ccontraseña</span>
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <a href='#'>Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className='overlay-container'>
                    <div className='overlay'>
                        <div className='overlay-panel overlay-left'>
                            <h1>Hey Bienvenido!</h1>
                            <p>¿Ya tienes cuenta? inicia sesión dando click aquí</p>
                            <button className='ghost' id='signIn' onClick={() => setState('')}>
                                Iniciar sesión
                            </button>
                        </div>
                        <div className='overlay-panel overlay-right'>
                            <h1>Eres nuevo</h1>
                            <p>Registrarte para conseguir miles de ofertas</p>
                            <button className='ghost' id='signUp' onClick={() => setState('right-panel-active')}>
                                Registrate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
