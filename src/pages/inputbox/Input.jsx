/* eslint-disable react/prop-types */
import { TextField } from "@mui/material"

const Input = ({label,type}) => {
  return (
          <TextField label={label} id="outlined-size-small" size="small" type={type} />
  )
}

export default Input