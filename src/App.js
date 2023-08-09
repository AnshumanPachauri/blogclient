import "./App.css";
import DataProvider from './context/DataProvider.jsx';
import Login from './components/account/Login';
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import { BrowserRouter,Navigate,Outlet,Route,Routes } from 'react-router-dom';
import { useState } from "react";
import CreatePost from "./components/create/CreatePost";


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  // this function checks if the user is Authenticated for login.
  // if it is Authenticated then it will take user to home page otherwise it will take user to login page.
  return isAuthenticated ? 
    <>
    {/* this will work in case of user it authenticated.*/}
    {/* header will also be set here as we want header if the user is authenticated else we dont want show it. */}
      <Header/>
      <Outlet />
    </>
    :
    // this will work in case if user has refreshed ans is unauthenticated.
    <Navigate replace to = '/login' />  
  // it will work in refresh....after a refresh isauthenticated will become false then the privaterouter will take you to login page.

}


function App() {

  const [ isAuthenticated, isUserAuthenticated ] = useState(false);

  return (
    
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            {/* this is the use of PrivateRouter function */}

            <Route path="/" element={ <PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home/>} />
            </Route>

            <Route path="/create" element={ <PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create" element={<CreatePost/>} />
            </Route>
            
            {/* this is the use of PrivateRouter function */}
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
    
  );
}

export default App;
