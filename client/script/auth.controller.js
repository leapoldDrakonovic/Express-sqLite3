class authController {

    constructor (login, password) {
        this._login = login
        this._password = password
    }

    sendLogin = async (req,res) => {
        try {
            await fetch ('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: this._login,
                    password: this._password
                
                })      
            })
            console.log(JSON.parse(req.body));
        } catch (error) {
            console.log(error);
        }
    }

    sendRegistation = async () => {
        try {
            await fetch ('http://localhost:5000/api/auth/registration', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: this._login,
                    password: this._password
                
                })      
            })
        } catch (error) {
            console.log(error);
        }
    }

}


export {authController}
