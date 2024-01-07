export default class Theater {
    constructor() {
        console.log('in theaters')
        this.adultNum = 0
        this.youthNum = 0
        this.totalNum = 0
        this.seatList = []

        this.$adultBtn = document.getElementById('adultBtn')
        this.$adultBtns = this.$adultBtn.querySelectorAll('.--general')
        this.$youthBtn = document.getElementById('youthBtn')
        this.$youthBtns = this.$youthBtn.querySelectorAll('.--youth')
        this.$adultBtns[0].classList.add('toggle')
        this.$youthBtns[0].classList.add('toggle')

        this.$seatBtn = document.querySelectorAll('.seat')
        this.$checkHandicap = document.getElementById('checkHandicap')

        this.checkDisable()
        this.render()
    }

    checkBtns  = (Btns) => {
        Btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if(btn.classList.contains('--general')) {
                    this.adultNum = btn.innerHTML
                }
                else if(btn.classList.contains('--youth')) {
                    this.youthNum = btn.innerHTML
                }
                this.totalNum = +this.adultNum + +this.youthNum
                if(this.$checkHandicap.checked && this.totalNum >=4) {
                    window.alert(`머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.`)
                    return
                }
                this.seatActive()
                this.checkDisable()
                Btns.forEach(btn => {
                    btn.classList.remove('toggle')
                })
                btn.classList.add('toggle')
            })
        });
    }

    checkDisable = () => {
        if(this.totalNum === 0 || +this.adultNum >=4 || +this.youthNum >= 4 || +this.totalNum >= 4) {
            this.$checkHandicap.disabled = true
            this.$seatBtn.forEach(seat => {
                if(seat.classList.contains('handicap')) {
                    seat.classList.add('disabled')
                }
            })
        } else {
            this.$seatBtn.forEach(seat => {
                if(seat.classList.contains('handicap')) {
                    seat.classList.remove('disabled')
                }
            })
            this.$checkHandicap.disabled = false
        }
    }

    handicapActive = () => {
        this.$checkHandicap.addEventListener('click', () => {
            if(this.$checkHandicap.checked) {
                this.$seatBtn.forEach(seat => {
                    if(!seat.classList.contains('handicap')) {
                        seat.classList.add('disabled')
                    }
                });
            } else {
                this.$seatBtn.forEach(seat => {
                    if(!seat.classList.contains('handicap')) {
                        seat.classList.remove('disabled')
                    }
                });

            }
        })
    }

    clickSeat = () => {
        this.$seatBtn.forEach(seat => {
            seat.addEventListener('click', () => {
                if(this.seatList.length === this.totalNum) return
                this.seatList.push(seat.innerHTML)
                seat.classList.add('clicked')
            })
        });
    }

    seatActive = () => {
        if(this.totalNum >= 1) {
            this.$seatBtn.forEach(seat => {
                seat.classList.remove('disabled')
            });
        }
    }

    render = () => {
        this.checkBtns(this.$adultBtns)
        this.checkBtns(this.$youthBtns)
        this.handicapActive()
        this.clickSeat()
    }


} 