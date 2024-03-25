import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function useAuth() {

  const [ currentuser,setCurrentUser ] = useState(null);  
  const [ loader,setLoader ] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
        
          setCurrentUser(user);
          setLoader(false);
       
     });

    return () => unsubscribe();
  }, [])

  return {currentuser,loader};
}

export default useAuth;