import React from 'react'

import pic from '../../../assets/infoillustrations/Error404.png'

function BasicError() {
  return (
    <div>
        <figure className="error_illustrations">
          <img src={pic} alt="" srcSet="" />
          <header>Failed To Load</header>
        </figure>
      </div>
  )
}

export default BasicError