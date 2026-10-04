import React from 'react'

const HomePage = () => {
  return (
   
      <main>
         <div className="left">
            <textarea name="jobDescription" id="jobDescription" placeholder="Enter job description details here..."></textarea>
         </div>
         <div className="right">
            <div className="">
                <label htmlFor="resume">Upload resume</label>
                <input type="file" name="resume" accept='.pdf'/>
            </div>
            <div className="">
                <label htmlFor="selfDescription">SelfDescription</label>
                <textarea name="selfDescription" placeholder='Decsribe yourself'></textarea>
            </div>
         </div>
      </main>
    
  )
}

export default HomePage
