



const weatherForm=document.querySelector('form');
const searchResult=document.querySelector('input');
const message1=document.querySelector('#message1');
const message2=document.querySelector('#message2');

//message1.textContent='From javascript'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=searchResult.value;

    message1.textContent='loading...';
    message2.textContent=''
   
    console.log(location);
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
          if(data.error){
             message1.textContent=data.error;
          }else{
            message1.textContent=data.location;
            message2.textContent=data.forecast;
           
          }
            
        })
    })


    //console.log('Testing');
})