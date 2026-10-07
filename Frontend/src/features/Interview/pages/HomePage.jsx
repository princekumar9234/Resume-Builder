import React from 'react'

const HomePage = () => {
  return (
    <main> 
      <div className="flex flex-col w-full">
        <label htmlFor="jobDescription">jobDescription</label>
        <textarea id="jobDescription" name="jobDescription" rows="10" cols="20"></textarea>
      </div>
      <div className="flex flex-col">
       <div>
         <label htmlFor="resume">resume</label>
        <input type="file" accept='.pdf'/>
        </div>
       <label htmlFor="selfDescitption">selfDescitption</label>
       <textarea name="jobDescription" rows="4" cols="50"></textarea>
      </div>
    </main>
  )
}

export default HomePage
