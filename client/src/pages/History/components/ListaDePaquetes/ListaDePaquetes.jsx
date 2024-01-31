import React, { useEffect, useState } from 'react'
import { BiArea, BiX } from 'react-icons/bi'
import usePackageStore from '../../../../store/PackageStore/PackageStore'
import { useAuthStore } from '../../../../store/AuthStore/AuthStore'
import StylesForm from '../../../../constants/StylesForm'
import usePagination from '../../../../components/Pagination/Pagination'
import Paginacion from '../Historial/components/Paginacion'

const ListaDePaquetes = () => {
  const { token } = useAuthStore()
  const { paquetes, update, getPaquetes } = usePackageStore()
  const [detailPaquete, setDetailPaquete] = useState(null)
  const { genericCard2 } = StylesForm()
  const { currentItems, funcPaginate } = usePagination(paquetes)

  useEffect(() => {
    const response = getPaquetes(token)
    console.log('response --> ', response)
  }, [update])

  const calcStatus = (status) => status === 'received'

  const handelActiveRenderIndex = (e, objeto) => {
    e.preventDefault()
    document.startViewTransition(() => {
      setDetailPaquete(objeto)
    })
  }

  const handleCloseModal = (e) => {
    e.preventDefault()
    document.startViewTransition(() => {
      setDetailPaquete(null)
    })
  }
  // if (detailPaquete === null) {
  //   setDetailPaquete(paquetes[0])
  // }
  console.log('detailPaquete --> ', detailPaquete)

  const genericTitulo = 'font-titulo text-sm text-slate-600 font-bold flex justify-start items-center gap-2'
  const genericSpan = 'font-parrafo text-sm text-slate-600 font-medium'
  return (
    <div className='w-full h-full  py-6 '>
      <section className='flex flex-row w-full justify-center items-center bg-white gap-2 py-5'>
        <h2 className='w-auto text-3xl font-bold text-slate-600 shadow-black '>Paquetes</h2>
        {/* <button className='text-slate-500 cursor-pointer rounded-full w-[30px] h-[30px] grid place-content-center border-2 border-slate-600 text-xl hover:text-slate-300 hover:border-slate-300 transition-all ease-linear duration-300'>
          <BiPlus />
        </button> */}
      </section>

      <section className='ContainGeneral mx-auto w-[98%] h-auto  py-2 flex flex-col lg:flex-row gap-1 flex-nowrap bg-white rounded-md'>
        <section className='sectionCard w-full flex flex-row flex-wrap justify-center items-center gap-2 lg:w-1/2  h-auto'>
          {currentItems.map((paquete) => (
            <section
              key={paquete._id}
              className={`relative w-[260px] lg:w-[340px] h-[150px] lg:h-[140px] border-2 text-left p-2 lg:p-3 rounded-md font-parrafo text-sm font-normal ${genericCard2}`}
            >
              <p className={`estadoPakage ${genericTitulo} `}>Estado: <span className={`rounded-full py-1 px-2 ${genericSpan} ${calcStatus(paquete.status) ? 'bg-green-300' : 'bg-red-400'} `}>{paquete?.status || 'pendiente'}</span> </p>

              <p className={`estadoPakage ${genericTitulo} `}>Repartidor:
                <span className={`${genericSpan}`}>{paquete?.deliverer || 'pepito'}
                </span>
              </p>

              <p className={`estadoPakage ${genericTitulo} `}>Destino:
                <span className={`${genericSpan}`}>{paquete?.recipient?.fullName || 'cali'}
                </span>
              </p>

              <button
                className='absolute top-1 right-1 text-2xl hover:text-yellow-50 transition-all ease-linear duration-300'
                onClick={(e) => handelActiveRenderIndex(e, paquete)}
              >
                <BiArea />
              </button>
            </section>
          ))}
          <Paginacion paginate={funcPaginate} />
        </section>
        {/* seccion Detalle lg */}
        <section className='hidden detailsCards w-full lg:w-1/2 lg:flex justify-center items-center min-h-[300px]'>
          {detailPaquete === null
            ? <h2>seleccione un paquete</h2>
            : (
              // esto lo puedo componetizar y reusar, pero me da diaca, lo copio y lo pego y fue xD
              <article className='relative detailPaquete w-[90%] xl:w-[500px] h-[430px] bg-white p-1 rounded-md overflow-hidden flex flex-col justify-center items-center shadow-custom text-left gap-2'>

                {/* image detalle */}
                <img className='w-full lg:w-full h-[240px] object-cover rounded-sm' src={` ${detailPaquete?.photoURL || 'https://res.cloudinary.com/dpiwmbsog/image/upload/v1703751913/carpincho/pakage_oih8iw.jpg'}`} alt={detailPaquete?.description} />

                {/* textos detalle */}
                <section className='DetailText w-full h-auto'>
                  <p className={`estadoPakage ${genericTitulo} `}>Destino:
                    <span className={`${genericSpan}`}>{detailPaquete?.recipient?.fullName}</span>
                  </p>
                  <p className={`estadoPakage ${genericTitulo} `}>Repartidor:
                    <span className={`${genericSpan}`}>{detailPaquete?.deliverer}</span>
                  </p>
                  <p className={`estadoPakage ${genericTitulo} `}>Detalle:
                    <span className={`${genericSpan}`}>{detailPaquete?.description}</span>
                  </p>
                  <p className={`estadoPakage ${genericTitulo} `}>Tipo:
                    <span className={`${genericSpan}`}>{detailPaquete?.type}</span>
                  </p>
                </section>
                <button className={`absolute top-1 left-1 px-2 py-1 rounded-3xl ${genericSpan} ${calcStatus(detailPaquete.status) ? 'bg-green-300' : 'bg-red-400'} `}>{detailPaquete?.status}</button>

                <button
                  className='closeModal absolute top-1 right-1 w-7 h-7 bg-red-500 text-slate-700 text-2xl hover:bg-slate-600 hover:text-red-400 transition-all ease-linear duration-300 rounded-md  grid place-content-center'
                  onClick={handleCloseModal}
                >
                  <BiX />
                </button>
              </article>
              )}
        </section>
      </section>
      {/* seccion detalle movile hasta lg */}
      {detailPaquete && (
        <section className='modalDetail lg:hidden detailsCards mx-auto w-[100%]  h-full flex justify-center items-center bg-white absolute top-0 left-0'>
          <article className='relative detailPaquete w-[300px] md:w-[400px] h-[430px] bg-white p-1 rounded-md overflow-hidden flex flex-col justify-center items-center shadow-custom text-left gap-2'>

            {/* image detalle */}
            <img className='w-full lg:w-full h-[240px] object-cover rounded-sm' src={` ${detailPaquete?.photoURL || 'https://res.cloudinary.com/dpiwmbsog/image/upload/v1703751913/carpincho/pakage_oih8iw.jpg'}`} alt={detailPaquete?.description} />

            {/* textos detalle */}
            <section className='DetailText w-full h-auto'>
              <p className={`estadoPakage ${genericTitulo} `}>Destino:
                <span className={`${genericSpan}`}>{detailPaquete?.recipient.fullName}</span>
              </p>
              <p className={`estadoPakage ${genericTitulo} `}>Repartidor:
                <span className={`${genericSpan}`}>{detailPaquete?.deliverer}</span>
              </p>
              <p className={`estadoPakage ${genericTitulo} `}>Detalle:
                <span className={`${genericSpan}`}>{detailPaquete?.description}</span>
              </p>
              <p className={`estadoPakage ${genericTitulo} `}>Tipo:
                <span className={`${genericSpan}`}>{detailPaquete?.type}</span>
              </p>
            </section>
            <button className={`absolute top-1 left-1 px-2 py-1 rounded-3xl  ${calcStatus(detailPaquete.status) ? 'bg-green-300' : 'bg-red-400'} `}>{detailPaquete?.status}</button>

            <button
              className='closeModal absolute top-1 right-1 w-7 h-7 bg-red-500 text-slate-700 text-2xl hover:bg-slate-600 hover:text-red-400 transition-all ease-linear duration-300 rounded-md  grid place-content-center'
              onClick={handleCloseModal}
            >
              <BiX />
            </button>
          </article>
        </section>
      )}
    </div>
  )
}

export default ListaDePaquetes
