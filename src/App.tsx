import { RouterProvider } from 'react-router-dom'
import './App.css'
import { myRouter } from './Components/Routes'
import { useReducer } from 'react'
import { initialState, userCotext, UserReducer } from './Types/User'

function App() {
  const [userSite,DispachUser]=useReducer(UserReducer,initialState)

  return (
<>
  <userCotext.Provider value={[userSite,DispachUser]}>
  <RouterProvider router={myRouter} />
  </userCotext.Provider>

</>
  )
}

export default App
