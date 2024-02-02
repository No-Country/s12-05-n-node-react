import { useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { BiSolidTruck, BiSolidTimeFive, BiSolidReport, BiPackage, BiCar, BiArrowFromLeft, BiCog } from 'react-icons/bi'
import useNavStore from '../../store/NavStore/navStore'
import { useAuthStore } from '../../store/AuthStore/AuthStore'
import ToggleNav from '../../components/ToggleNav/ToggleNav'
import logoImage from '../../assets/images/logo.svg'

const VerticalMenu = ({ activeNavVerticas, setActiveNavVerticas }) => {
  const { activeIndex } = useNavStore()
  const navigate = useNavigate()
  const menuRef = useRef(null)
  const [buttonActivado, setButtonActivado] = useState(false)
  const [animationActive, setAnimationActive] = useState(false)
  const [perfilImage, setPerfilImage] = useState(null)

  const { user } = useAuthStore()

  const handleClickNavVerticas = (e) => {
    e.preventDefault()
    setActiveNavVerticas(!activeNavVerticas)
  }

  const handleClickOutsideMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setActiveNavVerticas(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideMenu)

    return () => {
      document.removeEventListener('click', handleClickOutsideMenu)
    }
  }, [])

  const handleNavigate = (e) => {
    e.preventDefault()
    navigate('/historial/reportes')
  }

  useEffect(() => {
    setPerfilImage(user?.photoUrl)
  }, [user])
  const imageUser = 'https://res.cloudinary.com/dpiwmbsog/image/upload/v1701381196/carpincho/portrait_of_a_cartoon_capybara_with_sunglasses_and_ujhmyj.jpg'

  const spanCustom = 'lg:block font-semibold text-base text-center'
  const customButton = 'customButton p-3 lg_p-0 bg-gradient-to-r from-green-500 via-green-700 to-blue-400 text-white hover:text-slate-800 hover:bg-gradient-to-r hover:from-slate-50 hover:via-slate-300 hover:to-slate-500 w-[123px] h-[123px] lg:h-[40px] rounded-md flex flex-col-reverse justify-around items-center text-3xl lg:text-lg lg:w-[98%] lg:flex-row lg:flex-nowrap lg:justify-start lg:items-center lg:gap-2 lg:pl-5 transition-all ease-linear duration-300 shadow-custom '
  const customIcon = 'ml-auto lg:ml-0'
  const customButtonActive = 'bg-gradient-to-r from-slate-50 via-slate-300 to-slate-500 text-[#607d8b]'
  const customButtonInactive = 'bg-gradient-to-r from-green-500 via-green-700 to-blue-400 '

  const handleClickButton = (e) => {
    e.preventDefault()
    if (!buttonActivado) {
      setButtonActivado(!buttonActivado)
      setTimeout(() => {
        setAnimationActive(!animationActive)
      }, 100)
    } else {
      setAnimationActive(!animationActive)
      setTimeout(() => {
        setButtonActivado(!buttonActivado)
      }, 300)
    }
  }

  const localStorage = window.localStorage

  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem('token')
    localStorage.removeItem('authStore')
  }

  return (
    <div ref={menuRef} className={`alfa z-30 w-[100%] min-h-[80px] ${activeNavVerticas ? 'lg:transform lg:w-0' : 'lg:transform lg:w-1/5'}  lg:relative lg:h-screen lg:min-h-screen flex justify-center items-center content-center lg:justify-center lg:items-start shadow-custom bg-gray-300 `}>
      <section className='navSuperior activeNavVerical absolute top-auto  w-[100%] h-[70px] lg:top-0 lg:left-0 lg:w-[100vw] bg-gray-300 rounded-r-[3px] text-md z-30 flex flex-row justify-between items-center px-2 lg:px-5 overflow-hidden'>
        <ToggleNav activeNavVerticas={activeNavVerticas} handleClickNavVerticas={handleClickNavVerticas} />
        <img className='w-[60px] h-[60px] rounded-full object-cover overflow-hidden' src={`${logoImage}`} onClick={handleNavigate} alt='logotipo' />
      </section>
      <nav className={`navVerical absolute flex justify-center items-start lg:pt-0 lg:items-start lg:relative w-full h-full ${activeNavVerticas ? 'top-0 lg:top-0 lg:-left-[500px]  ' : '-top-full lg:-top-0 lg:-left-0'} transition-all ease-linear duration-200 p-2 lg:pt-[80px] rounded-r-lg lg:w-[100%] lg:h-screen bg-gray-300`}>
        {/* hamburguer */}

        {/* submenu */}
        <ul className='navMenuVert w-[258px] mt-[80px] lg:mt-0 h-auto grid gap-2 grid-cols-2 grid-rows-2 place-content-center lg:pl-1 z-50 lg:flex lg:w-[100%] lg:h-auto lg:flex-col lg:flex-nowrap lg:gap-3 '>
          <li>
            <button
              className='relative customButton mx-auto z-30 w-[123px] h-[123px]  rounded-md lg:rounded-full flex justify-center items-center text-xl lg:w-[190px] lg:h-[190px] lg:flex-col lg:flex-nowrap lg:justify-center lg:items-center lg:gap-2 '
              onClick={(e) => handleClickButton(e)}
            >
              <img
                className='w-full h-full lg:w-[120px] lg:h-[120px] bg-white object-cover rounded-md lg:rounded-full shadow-custom'
                title='imagen perfil del usuario'
                src={perfilImage || imageUser}
                alt='imagen de perfil del usuario'
              />
              <span className='hidden lg:block font-semibold text-lg text-center'>Usuario</span>
            </button>
          </li>
          <li className={`${buttonActivado ? 'block relative lg:absolute lg:top-[105px] lg:right-2' : 'hidden'}`}>
            <section className={`absolute top-0 ${animationActive ? 'left-0 z-30' : '-left-[130px] z-0'} px-1 bg-white w-[123px] h-[123px]  rounded-md flex flex-col justify-center items-center text-3xl
            lg:h-auto lg:w-[160px] lg:p-3 transition-all ease-linear duration-300 shadow-custom `}
            >
              <button
                className='w-full h-auto  rounded-md flex justify-start items-center gap-1 text-sm lg:text-lg text-[#607d8b] py-1  '
                onClick={() => navigate('/historial/')}
              >
                <BiCog />
                Editar Perfil
              </button>
              <span className='w-full h-[2px] rounded-xl bg-slate-300' />
              <button
                className='w-full h-auto py-2 flex justify-start items-center gap-2 text-sm lg:text-lg text-[#607d8b]'
                onClick={handleLogout}
              >
                <BiArrowFromLeft />
                Salir
              </button>
            </section>
          </li>
          <li>
            <button
              className={`${customButton} ${activeIndex === 'ingresoReportes' && activeIndex !== null ? `${customButtonActive}` : `${customButtonInactive}`}`}
              onClick={() => navigate('/historial/reportes')}
            >
              <BiSolidReport className={`${customIcon}`} />
              <span className={`${spanCustom}`}>Inicio</span>
            </button>
          </li>
          <li>
            <button
              className={`${customButton}  ${activeIndex === 'ingresoRapido' && activeIndex !== null ? `${customButtonActive}` : `${customButtonInactive}`}`}
              onClick={() => navigate('/historial/ingresoRapido')}
            >
              <BiSolidTruck className={`${customIcon}`} />
              <span className={`${spanCustom}`}>Ingreso/Egreso</span>
            </button>
          </li>
          <li>
            <button
              className={`${customButton} ${activeIndex === 'historial' && activeIndex !== null ? `${customButtonActive}` : `${customButtonInactive}`}`}
              onClick={() => navigate('/historial/historia')}
            >
              <BiSolidTimeFive className={`${customIcon}`} />
              <span className={`${spanCustom}`}>Visitas</span>
            </button>
          </li>

          <li>
            <button
              className={`${customButton} ${activeIndex === 'paquetes' && activeIndex !== null ? `${customButtonActive}` : `${customButtonInactive}`}`}
              onClick={() => navigate('/historial/paquetes')}
            >
              <BiPackage className={`${customIcon}`} />
              <span className={`${spanCustom}`}>Paquetes</span>
            </button>
          </li>
          <li>
            <button
              className={`${customButton} ${activeIndex === 'vehiculos' && activeIndex !== null ? `${customButtonActive}` : `${customButtonInactive}`}`}
              onClick={() => navigate('/historial/vehiculos')}
            >
              <BiCar className={`${customIcon}`} />
              <span className={`${spanCustom}`}>Vehiculos</span>
            </button>
          </li>
        </ul>

      </nav>
    </div>
  )
}

export default VerticalMenu
