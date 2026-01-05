import React from 'react'

const EmptyCard = ({imgSrc,message}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 md:mt-20 px-4">
      <img src={imgSrc} alt="No notes yet" className='w-48 md:w-60'/>

      <p className='w-full md:w-2/3 lg:w-1/2 text-xs md:text-sm font-medium text-center text-slate-800 mt-4'>{message}</p>
    </div>
  )
}

export default EmptyCard
