// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import ModelMessage from './ModelMessage'



// const textInfo = {
//     userName:'',
//     email:'',
//     message:''
// }

// export const ContactSendMessage = () => {
//     const [sendText, setSendText] = useState(textInfo)
//     const [alarmMessage, setAlermMessage] = useState(false)

//     useEffect(() => {
//        setTimeout(()=>{
//        setAlermMessage(false)
//        },3000)
//     },[alarmMessage])


//     const handleInput = (e)=>{
//         setSendText({...sendText, [e.target.name]:[e.target.value]})
//     }

//     const handleSubmit = (e)=>{
//         e.preventDefault()
//         const {userName, email, message} = sendText

// if(userName[0].length >= 2 && email[0].includes('@') &&  message[0].length > 2){
  
//     const yourMessage = {
//         usename: userName[0],
//         email: email[0],
//         message: message[0]
//     }

//     axios.post('https://formspree.io/f/xjvpnegv', yourMessage)
//                 setSendText(textInfo)
//                 setAlermMessage(true)
// }else{
//     console.log('something is wrong with your inputs');
// }                      
//         }
    

//     return (
//         <div>
//           {
//               alarmMessage &&  <ModelMessage title='Message Delivered...'/>
//           } 
//             <form onSubmit={handleSubmit}>
//             <div className="form-group">
//             <input type="text" placeholder='name' name='userName' required value={sendText.userName} onChange={handleInput} className='form-control' />
//             <input type="text" placeholder='email' value={sendText.email} required name='email' onChange={handleInput} className='form-control' />
//             <textarea name="message" placeholder='your message' required value={sendText.message} style={{resize:'none'}} onChange={handleInput} className='form-control' ></textarea>
//           </div>
//             <button className='submit-btn btn'>send your message</button>
//             </form>
//         </div>
//     )
// }