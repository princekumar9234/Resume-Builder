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
    <h2>Resume</h2>
    <label htmlFor="resume" className="inline-block bg-gray-400 cursor-pointer rounded-md  px-4 py-2 text-white text-center">Upload Resume</label>
    <input type="file"  id="resume" name="resume" accept=".pdf" className="hidden" placeholder='Upload resume'/> 
  </div>
      <div className='flex  flex-col'>
        <label htmlFor="selfDescirption">selfDescirption</label>
      <textarea rows='12' cols='27' className='border focus:outline-none p-2'></textarea>
      </div>
      <button className='border-none py-2 px-3 bg-red-600 mt-2 font-bold text-gray-20 rounded-2xl'>Generate interview report</button>
     </div> 
     </div>
    </main>
  )
}

export default HomePage
