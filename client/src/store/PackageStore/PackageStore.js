import { create } from 'zustand'
import { endpoints } from '../../constants/api'
import axios from 'axios'

const usePackageStore = create((set) => ({
  paquetes: [],
  update: false,
  deletePack: false,
  errorPaquete: null,
  loading: false,
  setPaquetes: (paquetes) => set({ paquetes }),
  setUpdate: (update) => set({ update }),
  setDeletePack: (deletePack) => set({ deletePack }),
  setLoading: (loading) => set({ loading }),
  getPaquetes: async (token) => {
    set({ loading: true })
    try {
      const response = await axios.get(endpoints.getPaquetes, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      set({ paquetes: response?.data?.data, loading: false })
    } catch (error) {
      set({ errorPaquete: error, loading: false })
    }
    set({ loading: false })
  },
  subirPaquetes: async (token, formData) => {
    set({ loading: true })
    try {
      const response = await axios.post(`${endpoints.crearPaquetes}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error al subir los paquetes:', error)
      set({ errorPaquete: error })
    }
    set({ loading: false })
  }
}))

export default usePackageStore
