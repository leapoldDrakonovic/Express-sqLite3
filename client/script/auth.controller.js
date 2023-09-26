class authController {



    sendLogin = async ({username, password}) => {
        try {
            await fetch ('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                
                })      
            })
        } catch (error) {
            console.log(error);
        }
    }

    sendRegistation = async ({username, password}) => {
        try {
            await fetch ('http://localhost:5000/api/auth/registration', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                
                })      
            })
        } catch (error) {
            console.log(error);
        }
    }

    

}


export default new authController()