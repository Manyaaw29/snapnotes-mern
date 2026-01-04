import React from 'react'

const EmptyCard = ({imgSrc,message}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No notes yet" className='w-60'/>

      <p className='w-1/2 text-sm font-medium text-center text-slate-800'>{message}</p>
    </div>
  )
}

export default EmptyCard
