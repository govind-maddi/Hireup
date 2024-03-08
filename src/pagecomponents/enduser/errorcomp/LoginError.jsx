import React from 'react'

import loginpic from '../../../assets/infoillustrations/Login.png'


function LoginError() {
  return (
    <div>
        <figure className="error_illustrations">
          <img src={loginpic} alt="" srcset="" />
          <header>Login to Access</header>
        </figure>
      </div>
  )
}

export default LoginError