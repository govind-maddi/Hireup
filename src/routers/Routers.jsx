/* eslint-disable no-unused-vars */

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

/* pages */
import Home from '../pages/Home'
import Aboutus from '../pages/Aboutus'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import OrgnisationGenerator from '../pages/OrgnisationGenerator'

/* authenticated pages of web app */

    //end_user
    import Dashboard_User from '../pages/enduser/Dashboard_User'
    import Jobs from '../pages/enduser/Jobs'
    import Profile_User from '../pages/enduser/Profile_User'

    //admin
    import Dashboard_Admin from '../pages/admin/Dashboard_Admin'
    import Clients from '../pages/admin/Clients'
    import Roles_Admin from '../pages/admin/Roles_Admin'
    import Profile_Admin from '../pages/admin/Profile_Admin'

    //client
    import Dashboard_Client from '../pages/client/Dashboard_Client'
    import Roles_Client from '../pages/client/Roles_Client'
    import Profile_Client from '../pages/client/Profile_Client'

/* ----------------------------------- */



import ProtectedRoutes from './ProtectedRoutes'
import Expandedjob from '../pages/enduser/Expandedjob'
import CorporateLogin from '../pages/CorporateLogin'
import CorporateSignup from '../pages/CorporateSignup'

function Routers() {

    const navigate = useNavigate();

  return (
    <>
    <Routes>

        {/* common routes */}
        <Route path='/' element={ <Navigate to='home'/>}/>
        <Route path='/home' element={ <Home/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/corporate_login' element={ <CorporateLogin/> }/>
        <Route path='/corporate_signup' element={ <CorporateSignup/> }/>
        <Route path='/organisationgenerator' element={ <OrgnisationGenerator/> } />
        <Route path='/jobs' element={ <Jobs/> }/>

        {/*------------------  user routes ----------------------*/}
        <Route path='/user'>
            <Route path='dashboard' element={ <ProtectedRoutes Comp={ <Dashboard_User/> } /> } />
            <Route path='jobs' element={<ProtectedRoutes Comp={<Jobs />} />} />      
            <Route path='jobs/job' element={ <ProtectedRoutes Comp={ <Expandedjob/> } /> }/>
            <Route path='profile' element={<ProtectedRoutes Comp={<Profile_User typeOfUser="User" />} />} />
        </Route>

        {/* ---------------------------------------------------- */}


        {/*-------------------  admin routes  ----------------------*/}
        <Route path='/admin'>
            <Route path='dashboard' element={ <ProtectedRoutes Comp={ <Dashboard_Admin/> } /> } />
            <Route path='clients' element={ <ProtectedRoutes Comp={ <Clients/> } /> }/>
            <Route path='roles' element={ <ProtectedRoutes Comp={ <Roles_Admin/> } /> }/>
            <Route path='profile' element={ <ProtectedRoutes Comp={ <Profile_Admin typeOfUser="Admin"/> } /> }/>
        </Route>
        {/* ---------------------------------------------------- */}


        {/*-------------------  client routes  -----------------*/}
        <Route path='/client'>
            <Route path='dashboard' element={ <ProtectedRoutes Comp={ <Dashboard_Client/> } /> }/>
            <Route path='roles' element={ <ProtectedRoutes Comp={ <Roles_Client/> }/> } />
            <Route path='profile' element={ <ProtectedRoutes Comp={ <Profile_Client/> } /> }/>
        </Route>
        {/* ---------------------------------------------------- */}
    </Routes>
    </>
  )
}

export default Routers