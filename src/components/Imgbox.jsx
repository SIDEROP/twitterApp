import React from 'react'
import { useParams } from 'react-router-dom'
import "./css/Imgbox.css"

const Imgbox = () => {
  let usepara = useParams()
  return (
    <div className='Imgbox'>
      <div>
        <img src={usepara} />
      </div>
    </div>
  )
}

export default Imgbox