import { endpoints } from '../../constants/api'
import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware' // No olvides importar persist

export const useAuthStore = create(persist((set) => ({
  token: null,
  user: null,
  tokenDesifred: null,
  loading: false,
  update: false,
  setUser: (newUser) => set({ user: newUser }),
  setToken: (newToken) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('token', newToken)
    }
    set({ token: newToken })
  },
  setTokenDesifred: (newToken) => set({ tokenDesifred: newToken }),

  updateUser: async (updatedFields, token, user) => {
    // console.log('update valores enviados -> ', updatedFields)
    try {
      const userId = user._id

      if (!userId) {
        throw new Error('El ID del usuario no está definido')
      }

      const formData = new FormData()

      // Agrega los campos actualizados al FormData
      for (const key in updatedFields) {
        formData.append(key, updatedFields[key])
      }

      const response = await axios.patch(`${endpoints.patchUser}/${userId}`, updatedFields, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      // console.log('respuesta store -->', response)
      set({ user: { ...user, ...response.data.data } })
      set({ update: true })
      setTimeout(() => {
        set({ update: false })
      }, 300)
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
    }
  },
  fetchUserData: async (token) => {
    set({ loading: true })
    try {
      const response = await axios.get(endpoints.getUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log('response fetchUserData --> ', response.data)
      set({ user: response.data.data })
      set({ loading: false })
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error)
    }
  }
}), {
  name: 'authStore'
}))
