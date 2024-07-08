import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../app/clices/userSlice'
import { PiListDashes } from "react-icons/pi";

const Topbar = () => {
  let {toggleBtn} = useSelector(pre=>pre.app)
  let usedis = useDispatch()
  return (
    <div className='Topbar w-100 d-flex justify-content-between align-items-center text-white bg-dark'>
      <i><PiListDashes size={29} onClick={()=>usedis(toggle(toggleBtn))}/></i>
      <h5 className='mx-2 m-0 p-0'>SIDEROP</h5>
    </div>
  )
}

export default Topbar