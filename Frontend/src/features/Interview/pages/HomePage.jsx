import React from 'react'

const HomePage = () => {
  return (
   
      <main> 
        <div className="flex flex-col  bg-black text-3xl" >
            <div className="">
            <textarea name="jobDescription"  id="jobDescription" placeholder="Enter job description details here..."></textarea>
         </div>
         <div className="">
            <div className="flex">
                <label htmlFor="resume" className='text-4xl bg-amber-400'>Upload resume</label>
                <input type="file" name="resume" accept='.pdf'/>
            </div>
            <div className="flex ">
                <label htmlFor="selfDescription">SelfDescription</label>
                <textarea name="selfDescription" placeholder='Decsribe yourself'></textarea>
            </div>
         </div>
         </div>
      </main>
    
  )
}

export default HomePage
