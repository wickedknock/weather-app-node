console.log('HEELO JS HERE')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

//message1.textContent = 'from java'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    if (location === '') {

        console.log('NOTHING ENTERED')
    } else {
        fetch('/weather?address=' + location).then((response) => {

            response.json().then((data) => {

                if (data.error) {
                    message1.textContent = data.error
                } else {
                    message1.textContent=data.location
                    message2.textContent=data.forecast
                }

            })

        })
    }

})