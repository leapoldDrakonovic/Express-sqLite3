const authBtn = document.querySelector('#authorization-btn')
const loginInp = document.querySelector('#login-inp')
const passInp = document.querySelector('#pass-inp')

let winS = 'reg'

if (winS === 'log') {
    authBtn.innerHTML = 'Login'
    // authBtn.addEventListener('click', sendLogin)
} else if (winS === 'reg') {
    authBtn.innerHTML = 'Registration'
    // authBtn.addEventListener('click', sendRegistation)
}






async function sendLogin () {
    try {
        await fetch ('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: loginInp.value,
                password: passInp.value
            
            })      
        })
        loginInp.value = '' 
        passInp.value = ''
    } catch (error) {
        console.log(error);
    }
}

async function sendRegistation (req) {
    try {
        await fetch ('http://localhost:5000/api/auth/registration', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: loginInp.value,
                password: passInp.value
            
            })      
        })
        loginInp.value = '' 
        passInp.value = ''
        
    } catch (error) {
        console.log(error);
    }
}