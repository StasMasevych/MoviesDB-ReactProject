import React, { useState, useContext, useEffect } from 'react'

export const API_ENDPOINT = 'https://www.omdbapi.com/?apikey=3b86908c'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({show:false, msg:''})
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('Harry Potter')

  const fetchMovies = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

      if (data.Response === 'True') {
        setMovies(data.Search)
        setError({show:false, msg:''})
      }
      else {
        setError({show:true, msg:data.Error})
      }
      setIsLoading(false)

      console.log(movies)
      
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`)
  },[query])


  return <AppContext.Provider value={{isLoading, movies, query, error, setQuery}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
