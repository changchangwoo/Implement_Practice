export default class Login {
    constructor(email, password) {
        this.email = email
        this.password = password
        this.render()
    }

    render() {
        let email = this.email.value
        let password = this.password.value
        // 1. 이메일 혹은 비밀번호가 입력되어지지 않는 경우
        if (email === '' || password === '') {
            window.alert('이메일 혹은 비밀번호가 입력되어지지 않았습니다.')
            return
        }
        // 2. 이메일 및 비밀번호 유효성 검사
        if (!email.includes('@')) {
            window.alert('이메일 형식이 올바르지 않습니다.')
            return
        } else {
            let allowPattern = /^[a-zA-Z0-9\.]+@[a-z0-9-_\.]+\.co$/;
            let passallowPattern = /^(?=.*[a-zA-Z])(?=.*[!@~])(?=.*[0-9])[a-zA-Z0-9!@~]{8,20}$/;

            if (!allowPattern.test(email.trim())) {
                window.alert('이메일 형식이 올바르지 않습니다.')
                return
            }

            if (password.length < 8 || password.length > 20) {
                window.alert(`비밀번호는 최소 8자 이상, 최대 20자 이하로 구성해야 합니다.`)
                return
            }

            if (!passallowPattern.test(password.trim())) {
                window.alert(`비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.`)
                return
            }

            window.alert('로그인 성공!')

        }
    }
}


