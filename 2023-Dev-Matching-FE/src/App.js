import Login from './component/Login.js'
import Theater from './component/Theater.js'

export default class App {
    constructor() {
        this.$theaterLoginBtn = document.getElementById('theaterLoginBtn')
        this.$email = document.getElementById('email')
        this.$password = document.getElementById('password')
        this.$theaterBtn = document.getElementById('theaterBtn')

        this.render()
    }

    handleLoginCheck = () => {
        console.log(this.$email)
        new Login(this.$email, this.$password)
    }

    handleTheater = () => {
        new Theater()
    }

    render() {
        this.$theaterLoginBtn.addEventListener("click", this.handleLoginCheck);
        this.$theaterBtn.addEventListener("click", this.handleTheater)
    }
}