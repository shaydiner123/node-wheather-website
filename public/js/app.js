console.log('javascript client side file is loaded');

const wheatherForm= document.querySelector('form');
const search= document.querySelector('input');

const messegeOne= document.querySelector('#messege-1');
const messegeTwo=document.querySelector('#messege-2');

wheatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const adress= search.value;
    messegeOne.textContent='loading...';
    messegeTwo.textContent='';
    fetch('http://localhost:3000/wheather?adress='+encodeURIComponent(adress)).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                messegeOne.textContent= data.error;
            }
            else{
                messegeOne.textContent= data.location;
                messegeTwo.textContent=data.forecastData;
            }
        })
    });

})