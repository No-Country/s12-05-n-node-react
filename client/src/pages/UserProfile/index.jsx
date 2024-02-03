import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { useAuthStore } from '../../store/AuthStore/AuthStore'
import { FaRegEdit } from 'react-icons/fa'

import './UserProfile.css'
import PhotoCapture from './components/PhotoCapture'
import usePhotoCaptureStore from '../../store/PhotoCaptureStore/photoCaptureStore'

const UserProfile = () => {
  const { token, fetchUserData, user, updateUser, update } = useAuthStore()
  const navigate = useNavigate()

  const { editPhoto, setEditPhoto, captureImage } = usePhotoCaptureStore()

  const [editFullName, setEditFullName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editPhone, setEditPhone] = useState(false)
  const [editDni, setEditDni] = useState(false)
  const [editImagen, setEditImagen] = useState(false)

  // para las validaciones
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [documentId, setDocumentId] = useState('')
  const [imagen, setImage] = useState('')
  // para manejar los errores
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    token && fetchUserData(token)
  }, [token, update])

  // console.log('capturando imagen ->', imagen)
  // console.log('va la imagen --> ', editImagen)

  const validateForm = () => {
    const validateErrors = {}

    if (editFullName && !fullName.trim()) {
      validateErrors.fullName = 'El nombre es obligatorio'
    } else if (editFullName && !/^[a-zA-Z\s]+$/.test(fullName)) {
      validateErrors.fullName = 'El nombre solo puede contener letras'
    }

    if (editEmail && !email.trim()) {
      validateErrors.email = 'El email es obligatorio'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      validateErrors.email = 'El email no es valido'
    }

    if (editPhone && !phone.trim()) {
      validateErrors.phone = 'El teléfono es obligatorio'
    } else if (!/^\d+$/.test(phone)) {
      validateErrors.phone = 'El teléfono solo puede contener números'
    } else if (phone.length > 9) {
      validateErrors.phone = 'El teléfono debe tener mas de 8 dígitos'
    }

    if (editDni && !documentId.trim()) {
      validateErrors.documentId = 'El DNI es obligatorio'
    } else if (!/^\d+$/.test(documentId)) {
      validateErrors.documentId = 'El DNI solo puede contener números'
    } else if (documentId.length < 8) {
      validateErrors.documentId = 'El DNI no puede tener menos de 8 dígitos'
    }

    if (editImagen && !imagen) {
      validateErrors.captureImage = 'La foto es obligatoria'
    } else if (imagen.size > 3000000) {
      validateErrors.captureImage = 'La foto debe tener menos de 3MB'
    }

    return validateErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validateForm()
    console.log('validationErrors --> ', validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      return
    }

    const formData = new FormData(event.target)
    console.log('asasasasas -> ', captureImage)

    if (captureImage) {
      formData.append('image', captureImage)
    }

    const data = Object.fromEntries(formData)
    console.log('Data a enviar al servidor:', data)
    console.log('id del usuario: ', user._id)
    console.log('token: ', token)

    setErrors({})
    setSuccessMessage('Perfil actualizado correctamente')
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    try {
      const response = await updateUser(data, token, user)
      console.log('response --> ', response)
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
    }
  }

  useEffect(() => {
    setFullName(user?.fullName)
    setEmail(user?.email)
    setPhone(user?.phone)
    setDocumentId(user?.documentId)
  }, [user])

  const handelNavigateNovedades = (e) => {
    e.preventDefault()
    navigate('/historial/reportes')
  }

  const handleClickCustom = (e) => {
    setEditPhoto(false)
    setEditImagen(true)
  }

  const buttonStyles = 'absolute right-1 bottom-2 rounded-md bg-gradient-to-r from-green-500 via-green-700 to-blue-400 text-white  text-sm grid place-content-center '
  const buttonStyles2 = 'w-[30px] h-[30px] rounded-md bg-gradient-to-r from-green-500 via-green-700 to-blue-400 text-white absolute right-1 top-auto text-xl grid place-content-center'
  // console.log('imagen capturada en el storage', captureImage)
  return (
    <div className='w-[100%] h-[100%] z-10  grid place-content-center py-6'>
      <section className='w-[100%] h-auto flex flex-col justify-start items-center gap-5'>
        <button
          onClick={handelNavigateNovedades} className='w-[287px] h-[63px] md:hidden bg-[#ccdebc] rounded-[15px] flex flex-row justify-around items-center text-black font-semibold text-lg font-titulo shadow-custom cursor-pointer'
        >
          <span className='text-2xl'><IoIosArrowBack /></span>
          Editar Perfil
        </button>

        <form
          onSubmit={handleSubmit}
          className='min-w-[300px] md:w-[400px] lg:w-[500px] h-auto  p-5 flex flex-col justify-start items-center gap-3 backdrop-blur-md backdrop-saturate-180 bg-[#5b7dad50] bg-opacity-80 border-2 rounded-md border-white border-opacity-20 overflow-hidden' action=''
        >
          <div className='w-full h-auto  flex justify-center items-center transition-all ease-linear duration-500'>
            {
              editPhoto === false
                ? (
                  <div
                    className='imagenPerfil relative w-[100px] h-[100px] grid place-content-center rounded-full bg-gradient-to-r from-green-500 via-green-700 to-blue-400 cursor-pointer'
                  >

                    <img
                      className='w-[90px] h-[90px] rounded-full object-cover cursor-pointer'
                      src={user?.photoUrl || 'https://res.cloudinary.com/dpiwmbsog/image/upload/v1701381196/carpincho/portrait_of_a_cartoon_capybara_with_sunglasses_and_ujhmyj.jpg'} alt='carpincho image '
                    />
                    <button
                      className={`${buttonStyles} 
                    w-[20px] h-[20px] z-30`}
                      onClick={(e) => setEditPhoto(true)}
                    >
                      <FaRegEdit />
                    </button>
                    <input
                      type='file'
                      name='image'
                      id='image'
                      accept='image/png, image/jpeg'
                      onClick={handleClickCustom}
                      onChange={(e) => setImage(e.target.files[0])}
                      value={captureImage}
                      className='absolute w-full h-full top-0 left-0 rounded-full z-20 opacity-0 cursor-pointer bg-slate-200'
                    />
                  </div>
                  )
                : <PhotoCapture />
            }
          </div>

          <label htmlFor='fullName' className='w-[100%]  flex flex-col justify-start items-start relative text-white'>
            Nombre y Apellido
            {editFullName
              ? (
                <input
                  className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs text-slate-800'
                  type='text'
                  name='fullName' id='fullName'
                  placeholder='Ingresa Nombre y Apellido'
                  value={fullName || ''}
                  onChange={(e) => setFullName(e.target.value)}
                />
                )
              : (
                <div className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs  bg-white flex font-titulo text-gray-400 font-semibold justify-start items-center capitalize relative'>{user?.fullName}
                  <button className={`${buttonStyles2}`} onClick={(e) => setEditFullName(true)}>
                    <FaRegEdit />
                  </button>
                </div>
                )}
            {errors.fullName && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.fullName}</p>}
          </label>

          <label htmlFor='email' className='w-[100%] flex flex-col justify-start items-start text-white'>
            Email
            {editEmail
              ? (
                <input
                  className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs text-slate-800'
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Ingresa Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />)
              : (
                <div className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs  bg-white flex font-titulo text-gray-400 font-semibold justify-start items-center capitalize relative'>{user?.email}
                  <button className={`${buttonStyles2}`} onClick={(e) => setEditEmail(true)}>
                    <FaRegEdit />
                  </button>
                </div>
                )}
            {errors.email && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.email}</p>}
          </label>

          <label htmlFor='phone' className='w-[100%] flex flex-col justify-start items-start text-white'>
            Telefono
            {editPhone
              ? (
                <input
                  className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs text-slate-800 '
                  type='text'
                  name='phone'
                  id='phone'
                  placeholder='Ingresa Telefono'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                )
              : (
                <div className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs  bg-white flex font-titulo text-gray-400 font-semibold justify-start items-center capitalize relative'>{user?.phone}
                  <button className={`${buttonStyles2}`} onClick={(e) => setEditPhone(true)}>
                    <FaRegEdit />
                  </button>
                </div>
                )}
            {errors.phone && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.phone}</p>}
          </label>

          <label htmlFor='documentId' className='w-[100%] flex flex-col justify-start items-start text-white'>
            DNI
            {editDni
              ? (<input
                  className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs text-slate-800 '
                  type='text'
                  name='documentId'
                  id='documentId'
                  placeholder='Ingresa DNI'
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                 />)
              : (
                <div className='w-[100%] h-[40px] border-2 rounded-md outline-none px-3 text-xs  bg-white flex font-titulo text-gray-400 font-semibold justify-start items-center capitalize relative'>{user?.documentId}
                  <button className={`${buttonStyles2}`} onClick={(e) => setEditDni(true)}>
                    <FaRegEdit />
                  </button>
                </div>
                )}
            {
              errors.documentId && <p className='text-red-500 text-xs font-semibold mt-1'>{errors.documentId}</p>
            }
          </label>
          <button
            type='submit'
            className='w-[290px] h-[50px] rounded-3xl bg-gradient-to-r from-green-500 via-green-700 to-blue-400  font-titulo font-medium text-white'
          >
            Guardar cambios
          </button>
        </form>
        {successMessage === 'Perfil actualizado correctamente' && (
          <div className=' w-[90%] h-[90%] rounded-md absolute top-auto left-auto bg-green-300  grid place-content-center '>

            <p className='text-white text-lg font-bold '>VALIDACION EXITOSA</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default UserProfile
