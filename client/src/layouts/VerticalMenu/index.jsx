import { useNavigate } from 'react-router-dom'
import React, { useEffect, useRef } from 'react'
import { BiSolidTruck, BiSolidTimeFive, BiSolidReport, BiCaretRight, BiPackage, BiCar } from 'react-icons/bi'
import useNavStore from '../../store/NavStore/navStore'
import { useAuthStore } from '../../store/AuthStore/AuthStore'

const VerticalMenu = ({ activeNavVerticas, setActiveNavVerticas }) => {
  const { activeIndex } = useNavStore()
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const { user } = useAuthStore()
  console.log('user menuVertical -->', user)

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

  const imageUser = user?.photo || 'https://res.cloudinary.com/dpiwmbsog/image/upload/v1701381196/carpincho/portrait_of_a_cartoon_capybara_with_sunglasses_and_ujhmyj.jpg'

  return (
    <div ref={menuRef} className={`alfa z-30 w-[100%] min-h-[80px] ${activeNavVerticas ? 'lg:transform lg:w-0' : 'lg:transform lg:w-1/5'}  lg:relative lg:h-screen flex justify-center items-center content-center lg:justify-center lg:items-center shadow-custom bg-gray-500`}>
      <section className='navSuperior activeNavVerical absolute top-auto  w-[100%] h-[70px] lg:top-0 lg:left-0 lg:w-[100vw] bg-[#f4f3f3] rounded-r-[3px] text-md z-30 flex flex-row justify-between items-center px-2 lg:px-5 overflow-hidden'>
        <button
          className='activeNavVerical w-[50px] h-[50px] bg-[#f4f3f3] rounded-r-[3px] grid place-content-center text-md z-30'
          onClick={e => handleClickNavVerticas(e)}
        >
          <BiCaretRight className={`${activeNavVerticas ? 'rotate-180 transition-all ease-in-out duration-300' : 'rotate-0 transition-all ease-in-out duration-300'}`} />
        </button>
        <img className='w-[60px] h-[60px] rounded-full object-cover overflow-hidden' src='https://res.cloudinary.com/dpiwmbsog/image/upload/v1701381197/carpincho/2cf02024-3b12-478d-9fdf-998858aeaaee_zdvbm9.webp' alt='logotipo' />
      </section>
      <nav className={`navVerical absolute lg:relative w-full h-full ${activeNavVerticas ? 'top-0 lg:top-0 lg:-left-[500px]  ' : '-top-[1000px] lg:-top-0 lg:-left-0'} transition-all ease-linear duration-200 p-2 lg:pt-[80px] rounded-r-lg  lg:w-[100%] lg:h-screen bg-green-500`}>
        {/* hamburguer */}

        {/* submenu */}
        <ul className='navMenuVert pl-1 flex flex-row w-[100%] lg:flex-col lg:flex-nowrap gap-1'>
          <li>
            <button
              className='customButton w-[60px] h-[60px] rounded-full flex justify-center items-center text-xl lg:w-[98%] lg:h-[250px] lg:flex-col lg:flex-nowrap lg:justify-center lg:items-center lg:gap-2 lg:pl-5 '
              onClick={() => navigate('/historial/')}
            >
              <img
                className='w-full h-full lg:w-[150px] lg:h-[150px] object-cover rounded-full'
                title='imagen perfil del usuario'
                src={imageUser}
                alt='imagen de perfil del usuario'
              />
              <span className='hidden lg:block font-semibold text-lg text-center'>Usuario</span>
            </button>
          </li>

          <li>
            <button
              className={`customButton bg-colorCustom5 w-[60px] h-[60px] rounded-md flex justify-center items-center text-4xl lg:w-[98%] lg:flex-row lg:flex-nowrap lg:justify-start lg:items-center lg:gap-2 lg:pl-5  hover:bg-colorCustom1 transition-all ease-linear duration-300 ${activeIndex === 'ingresoRapido' && activeIndex !== null ? 'bg-orange-400' : 'bg-white'}`}
              onClick={() => navigate('/historial/ingresoRapido')}
            >
              <BiSolidTruck />
              <span className='hidden lg:block font-semibold text-lg text-center'>Ingreso Egreso</span>
            </button>
          </li>
          <li>
            <button
              className={`customButton bg-colorCustom5 w-[60px] h-[60px] rounded-md flex justify-center items-center text-4xl lg:w-[98%] lg:flex-row lg:flex-nowrap lg:justify-start lg:items-center lg:gap-2 lg:pl-5  hover:bg-colorCustom1 transition-all ease-linear duration-300 ${activeIndex === 'historial' && activeIndex !== null ? 'bg-orange-400' : 'bg-white'}`}
              onClick={() => navigate('/historial/historia')}
            >
              <BiSolidTimeFive />
              <span className='hidden lg:block font-semibold text-lg text-center'>Historial</span>
            </button>
          </li>
          <li>
            <button
              className={`customButton bg-colorCustom5 w-[60px] h-[60px] rounded-md flex justify-center items-center text-4xl lg:w-[98%] lg:flex-row lg:flex-nowrap lg:justify-start lg:items-center lg:gap-2 lg:pl-5  hover:bg-colorCustom1 transition-all ease-linear duration-300 ${activeIndex === 'reportes' && activeIndex !== null ? 'bg-orange-400' : 'bg-white'}`}
              onClick={() => navigate('/historial/reportes')}
            >
              <BiSolidReport />
              <span className='hidden lg:block font-semibold text-lg text-center'>Reportes</span>
            </button>
          </li>
          <li>
            <button
              className={`customButton bg-colorCustom5 w-[60px] h-[60px] rounded-md flex justify-center items-center text-4xl lg:w-[98%] lg:flex-row lg:flex-nowrap lg:justify-start lg:items-center lg:gap-2 lg:pl-5  hover:bg-colorCustom1 transition-all ease-linear duration-300 ${activeIndex === 'paquetes' && activeIndex !== null ? 'bg-orange-400' : 'bg-white'}`}
              onClick={() => navigate('/historial/paquetes')}
            >
              <BiPackage />
              <span className='hidden lg:block font-semibold text-lg text-center'>Paquetes</span>
            </button>
          </li>
          <li>
            <button
              className={`customButton bg-colorCustom5 w-[60px] h-[60px] rounded-md flex justify-center items-center text-4xl lg:w-[98%] lg:flex-row lg:flex-nowrap lg:justify-start lg:items-center lg:gap-2 lg:pl-5  hover:bg-colorCustom1 transition-all ease-linear duration-300 ${activeIndex === 'vehiculos' && activeIndex !== null ? 'bg-orange-400' : 'bg-white'}`}
              onClick={() => navigate('/historial/vehiculos')}
            >
              <BiCar />
              <span className='hidden lg:block font-semibold text-lg text-center'>Vehiculos</span>
            </button>
          </li>
        </ul>

      </nav>
    </div>
  )
}

export default VerticalMenu
