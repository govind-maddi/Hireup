
import useAuth from '../customhooks/useAuth';

function ProtectedRoutes( { Comp } ) {

    const { currentuser } = useAuth();

    console.log(currentuser);

  return (
    
    currentuser 
      ? 
        Object.keys(currentuser).length > 0 
        ?
        <> { Comp } </>
        :
        <>Login</> 
      : 
      <> Login </>
  )
}

export default ProtectedRoutes