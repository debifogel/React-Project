import { RouterProvider } from 'react-router-dom';
import './App.css';
import { myRouter } from './Components/Routes';
import { useReducer } from 'react';
import { initialState, UserReducer, UserCotext } from './Types/User'; 

function App() {
  const [userSite, DispachUser] = useReducer(UserReducer, initialState);

  return (
    <UserCotext value={[userSite, DispachUser]}>
      <RouterProvider router={myRouter} />
    </UserCotext>
  );
}

export default App;