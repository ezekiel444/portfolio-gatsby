import React, { useState } from 'react'

export default function Testing() {
  const [displaySun,setDisplaySun] = useState(false)
    return (
        <div className="  download_cv" >
      <span onClick={()=>setDisplaySun(!displaySun)}>
           <div className="download_cv_btn">
            <span>Download CV</span>
          </div>
          <div className={displaySun ? "sun_fr" : ""}>
            <a  href="../DownloadCV/Copy of Fr_Cv_Ezekiel_matomi_lucky.pdf" download="Ezekiel Resume Fr">Fr</a>
          </div>
          <div className={displaySun ?  "sun_en" : ""}>
            <a  href="https://drive.google.com/file/d/1PurvVFhFY1kbbDZCSLaEO2uCnAEJLHaP/view?usp=sharing" download="Ezekiel Resume En">En</a>
          </div>
        
  </span>    
      </div>
    )
}
