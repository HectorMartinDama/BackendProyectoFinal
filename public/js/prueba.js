const form= document.querySelector('.form')


// Envio la peticion http al backend
form.addEventListener('submit', event =>{
    event.preventDefault()
    const formData= new FormData(form)
    const data= Object.fromEntries(formData)

    fetch('http://localhost:3000/api/users/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => console.log('Mesaje', data.))
    .catch(error =>{
        console.log(error)
    })
})