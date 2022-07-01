import React from 'react'
import { useState } from 'react'
export default function Experiment() {

 const [condition, setCondition]=useState(false)
 const handleClick=()=>{
  if (condition == false){
setCondition(true)
  }else{
   setCondition(false)
  }
 }
  return (
<div>

 <div className='container'>
{!condition && <button onClick={handleClick} className='btnn'>Button</button>}
{condition && <div onClick={handleClick} className='box'></div>}
</div>
</div>


  )
}
