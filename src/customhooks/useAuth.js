import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

function useAuth() {

  const [ currentuser,setCurrentUser ] = useState({});  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      if(user)
        setCurrentUser(user);
      else
        setCurrentUser(null);
    });

    return () => unsubscribe();
  },[])

  return {currentuser};
}

export default useAuth;