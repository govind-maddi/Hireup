
import useAuth from '../customhooks/useAuth';
import loginpic from '../assets/infoillustrations/Login.png';

function ProtectedRoutes( { Comp } ) {

    const { currentuser,loader } = useAuth();

  return (

      loader ?  
          <span className='pageloader'></span> :
         
          currentuser ? 
          <>{Comp}</> : 
          <><figure className='loginpic'>
              <img src={loginpic} alt="" /><br/>
              <label style={{color:"#023436",fontWeight:"500",fontSize:"20px"}}><span style={{color:"#00BFB3",fontWeight:"600"}}>Login</span> to Continue</label>
            </figure></>
  )
}

export default ProtectedRoutes