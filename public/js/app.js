const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
const messageFour=document.querySelector('#message-4')
const messageFive=document.querySelector('#message-5')
weatherForm.addEventListener('submit',(ev)=>{
    ev.preventDefault()
    const location=search.value
    messageOne.textContent='loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{//it runs when the json data has arrived
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.temperature
            messageTwo.textContent=data.summary
            messageThree.textContent=data.precipProbability
            messageFour.textContent=data.temperatureHigh
            messageFive.textContent=data.temperatureLow
        }
    })
})
})