import React, { useState } from 'react'

const textInfo = {
    userName:'',
    email:'',
    message:''
}

export const Test = () => {
    const [sendText, setSendText] = useState(textInfo)

    const handleInput = (e)=>{
        setSendText({...sendText, [e.target.name]:[e.target.value]})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        
        console.log(sendText.userName);
        console.log(sendText.email);
        console.log(sendText.message);
    }

    return (
        <div>
            <form>
            <input type="text" name='userName' value={sendText.userName} onChange={handleInput} />
            <input type="text" value={sendText.email}  name='email' onChange={handleInput} />
            <textarea name="message" value={sendText.message} style={{resize:'none'}} onChange={handleInput} ></textarea>
            <button onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}
