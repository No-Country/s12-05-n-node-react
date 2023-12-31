import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { endpoints } from '../../constants/api'
import { jwtDecode } from 'jwt-decode'
import CelCarpinchoImage from '../../assets/images/CelCarpincho.png'
import { useAuthStore } from '../../store/AuthStore/AuthStore'

const LoginForm = () => {
  const localStorage = window.localStorage
  const { setTokenDesifred, setToken, fetchUserData } = useAuthStore()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const validateErrors = {}

    if (!email.trim()) {
      validateErrors.email = 'El email es obligatorio'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      validateErrors.email = 'El email no es válido'
    }

    if (!password.trim()) {
      validateErrors.password = 'La contraseña es obligatoria'
    } else if (password.length < 8) {
      validateErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }

    return validateErrors
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const validationErrors = validateForm()
    console.log('validationErrors -> ', validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      return
    }

    const formData = new FormData(event.target)
    setErrors({})
    setSuccessMessage('datos validados')
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    try {
      const response = await axios.post(endpoints.login, formData)
      const responseData = response.data
      // console.log('responseData Login-> ', responseData.data.token)
      fetchUserData(responseData?.data?.token)
      if (response.status === 200) {
        const decodedToken = jwtDecode(responseData?.data?.token)
        localStorage.setItem('token', responseData?.data?.token)
        setToken(responseData?.data?.token)
        setTokenDesifred(decodedToken)

        navigate('/historial/reportes')
      } else {
        throw new Error(responseData.message)
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      setErrors({ general: 'Error al iniciar sesión' })
    }
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className='flex h-screen flex-col sm:flex-row'>
      {/* División  */}
      <div className='w-full h-screen sm:w-1/2 flex flex-col justify-center items-center bg-cover sm:bg-none'>
        {successMessage && <p className='text-green-500 text-sm font-semibold capitalize font-titulo'>{successMessage}</p>}
        {/* // style={{ backgroundImage: `url(${CelCarpinchoImage})` */}
        <form onSubmit={handleLogin} className='w-full text-start max-w-md p-8  bg-[#EDEDED]  bg-opacity-90 sm:bg-opacity-100 shadow-md rounded-md'>
          <h2 className='text-2xl font-bold mb-8 text-center'>Iniciar Sesión</h2>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 text-sm font-semibold mb-2'>
              Correo Electrónico
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
            {errors.email && <p className='text-red-500 text-xs font-semibold'>{errors.email}</p>}
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 text-sm font-semibold mb-2'>
              Contraseña
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
            {errors.password && <p className='text-red-500 text-xs font-semibold'>{errors.password}</p>}
          </div>

          {/* Botón de inicio de sesión */}
          <div className='mb-6'>
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-green-500 via-green-700 to-blue-400  backdrop-blur-[6px] opacity-80 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none'
            >
              <b> Iniciar Sesión </b>
            </button>
          </div>

          {/* Enlace para registrarse */}
          <p className='text-sm text-center'>
            ¿No tienes una cuenta?{' '}
            <span
              onClick={handleRegister}
              className='text-blue-500 cursor-pointer hover:underline'
            >
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>
      <div className='w-1/2 bg-cover ' style={{ backgroundImage: `url(${CelCarpinchoImage})` }} />

    </div>
  )
}

export default LoginForm
