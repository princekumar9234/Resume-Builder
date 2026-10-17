import React from 'react'

const HomePage = () => {
  return (
    <main className='flex gap-2 ml-90 mt-10'> 
     <div className='flex flex-col'>
      <label htmlFor="jobDescirption">jobDescirption</label>
      <textarea rows='17' cols='30'  className='border focus:outline-none p-2'></textarea>
     </div> 
     <div>
 <div className='flex flex-col'>
  <div className='flex flex-col'>
    <label htmlFor="resume">resume</label>
    <input type="file" accept='.pdf'/> 
  </div>
      <div className='flex  flex-col'>
        <label htmlFor="selfDescirption">selfDescirption</label>
      <textarea rows='13' cols='27' className='border focus:outline-none p-2'></textarea>
      </div>
      <button className='border-none py-2 px-3 bg-red-600 mt-2 font-bold text-gray-20 rounded-2xl'>Generate interview report</button>
     </div> 
     </div>
    </main>
  )
}

export default HomePage
