import React, { useEffect, useState } from 'react'
import './styles.css'
import useNavStore from '../../../../store/NavStore/navStore'
import ListOfPeople from './components/ListOfPeople'
import Paginacion from './components/Paginacion'
import Search from '../../../../components/search'
import { useAuthStore } from '../../../../store/AuthStore/AuthStore'
import useVisitStore from '../../../../store/VisitStore/VisitStore'
import axios from 'axios'
import { endpoints } from '../../../../constants/api'

const Historial = () => {
  const { setActiveIndex } = useNavStore()
  const [currentPage, setCurrentPage] = useState(1)

  const { visitas, setVisitas } = useVisitStore()
  const [filterVisitas, setFilterVisitas] = useState([])

  const { token } = useAuthStore()

  useEffect(() => {
    axios.get(endpoints.visitas, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setVisitas(res.data.data)
        setFilterVisitas(res.data.data)
      })
      .catch(err => console.log(err))
  }, [setVisitas])

  useEffect(() => {
    setActiveIndex('historial')
    return () => setActiveIndex(null)
  }, [setActiveIndex])

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filterVisitas.reverse()?.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (action) => {
    if (action === 'next') {
      setCurrentPage((prev) => prev + 1)
    } else if (action === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleSearch = (filterData) => {
    setFilterVisitas(filterData)
  }

  // console.log('Vicitas en historial --> ', visitas)

  return (
    <div
      className='h-full mx-auto w-[95%] sm:w-[90%] md:w-[90%]  2xl:w-[1300px] lg:flex flex-col justify-start items-start xl:justify-center xl:items-center overflow-x-scroll 2xl:overflow-auto scrollbar pb-2 gap-4'
    >
      <Search allVisitas={visitas} nameColumn='visitorFullName' handleSearch={handleSearch} />
      {/* aca puedo componetizar mas */}
      <div className='mx-auto mt-3 w-[900px] 2xl:w-[1200px] grid grid-cols-5  rounded-lg  overflow-hidden text-colorCustom4 font-titulo font-medium text-xs lg:text-sm gap-1'>
        <div className=' py-2 bg-gradient-to-r from-green-500 via-green-700 to-blue-400 '>
          <h2 className='w-full text-center'>Empleado</h2>
        </div>
        <div className=' py-2 bg-gradient-to-r from-green-500 via-green-700 to-blue-400 '>
          <span>Estado</span>
        </div>
        <div className=' py-2 bg-gradient-to-r from-green-500 via-green-700 to-blue-400 '>
          <span>Fecha</span>
        </div>
        <div className=' py-2 bg-gradient-to-r from-green-500 via-green-700 to-blue-400 '>
          <span>Direccion</span>
        </div>
        <div className=' py-2 bg-gradient-to-r from-green-500 via-green-700 to-blue-400  rounded-tr-md'>
          <span>Visitante</span>
        </div>

        <ListOfPeople personas={currentItems} />
        <Paginacion paginate={paginate} />
      </div>

    </div>
  )
}

export default Historial
