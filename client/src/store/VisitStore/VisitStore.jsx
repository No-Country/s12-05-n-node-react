import { create } from 'zustand'
import { endpoints } from '../../constants/api'
const useVisitStore = create((set) => ({
  visit: [],

  registerVisit: async (visitData, token) => {
    try {
      const visitDataWithUserId = {
        ...visitData
      }
      const response = await fetch(endpoints.visitas, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(visitDataWithUserId)
      })

      if (response.status === 401) {
        throw new Error('Error de autenticación. Por favor, comprueba tu token.')
      } else if (response.status === 200) {
        console.log('registro de visitas exitoso')
      } else if (response.status >= 500) {
        throw new Error('Error del servidor. Por favor, inténtalo de nuevo más tarde.')
      } else if (!response.ok) {
        throw new Error('Error al crear la visita. Por favor, comprueba los datos de la visita.')
      }

      const data = await response.json()
      console.log('response createVisit --> ', data)
      console.log('La visita se registró correctamente')
      set(state => ({ visitas: [...state.visitas, data] }))
    } catch (error) {
      console.error('Error al crear la visita:', error.message)
    }
  },
  updateVisit: async (visitId, checkOut, token) => {
    try {
      const response = await fetch(`${endpoints.visitas}/${visitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ checkOut })
      })

      if (!response.ok) {
        throw new Error('Error al actualizar la visita')
      }

      const data = await response.json()
      console.log('response updateVisit --> ', data)
      console.log('La visita se actualizó correctamente')
      set(state => ({ visitas: state.visitas.map(visit => visit.id === visitId ? data : visit) }))
    } catch (error) {
      console.error('Error al actualizar la visita:', error)
    }
  },
  getAllVisits: async (token) => {
    try {
      const response = await fetch(endpoints.visitas, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener las visitas')
      }

      const data = await response.json()

      set({ visitas: data }) // Asegúrate de que la respuesta de la API tiene la estructura esperada
    } catch (error) {
      console.error('Error al obtener las visitas:', error)
    }
  },
  getVisitById: async (visitId, token) => {
    try {
      const response = await fetch(`${endpoints.visitas}/${visitId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener la visita')
      }

      const data = await response.json()
      console.log('response getVisitById --> ', data)
      console.log('La visita se obtuvo correctamente')
      set(state => ({ visitas: state.visitas.map(visit => visit.id === visitId ? data : visit) }))
    } catch (error) {
      console.error('Error al obtener la visita:', error)
    }
  },
  deleteVisit: async (visitId, token) => {
    try {
      const response = await fetch(`${endpoints.deleteVisit}/${visitId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la visita')
      }

      console.log('La visita se eliminó correctamente')
      set(state => ({ visitas: state.visitas.filter(visit => visit.id !== visitId) }))
    } catch (error) {
      console.error('Error al eliminar la visita:', error)
    }
  },

  setVisitas: (nuevaVisita) => {
    set((state) => ({
      ...state,
      visitas: Array?.isArray(state?.visitas) ? [...state?.visitas, nuevaVisita] : [nuevaVisita]
    }))
  }

}))

export default useVisitStore
