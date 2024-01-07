export default class Theater {
  constructor() {
    this.$adultBtn = document.getElementById("adultBtn");
    this.$adultBtns = this.$adultBtn.querySelectorAll(".--general");
    this.$youthBtn = document.getElementById("youthBtn");
    this.$youthBtns = this.$youthBtn.querySelectorAll(".--youth");

    this.$seatBtn = document.querySelectorAll(".seat");
    this.$checkHandicap = document.getElementById("checkHandicap");

    this.setInit(this.$seatBtn, this.$adultBtns, this.$youthBtns);

    this.$adultBtns[0].classList.add("toggle");
    this.$youthBtns[0].classList.add("toggle");

    this.render();
  }

  setInit = ($seatBtn, $adultBtns, $youthBtns) => {
    this.adultNum = 0;
    this.youthNum = 0;
    this.totalNum = 0;
    this.seatList = [];
    console.log("동작");
    $seatBtn.forEach((seat) => {
      seat.classList.add("disabled");
      seat.classList.remove("clicked");
    });
    $adultBtns.forEach((btn) => {
      btn.classList.remove("toggle");
    });

    $youthBtns.forEach((btn) => {
      btn.classList.remove("toggle");
    });
  };

  checkBtns = (Btns) => {
    Btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("--general")) {
          this.adultNum = btn.innerHTML;
        } else if (btn.classList.contains("--youth")) {
          this.youthNum = btn.innerHTML;
        }
        this.totalNum = +this.adultNum + +this.youthNum;
        if (this.$checkHandicap.checked && this.totalNum >= 4) {
          window.alert(
            `머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.`
          );
          return;
        }
        this.seatActive();
        this.checkDisable();
        Btns.forEach((btn) => {
          btn.classList.remove("toggle");
        });
        btn.classList.add("toggle");
      });
    });
  };

  checkDisable = () => {
    if (
      this.totalNum === 0 ||
      +this.adultNum >= 4 ||
      +this.youthNum >= 4 ||
      +this.totalNum >= 4
    ) {
      this.$checkHandicap.disabled = true;
      this.$seatBtn.forEach((seat) => {
        if (seat.classList.contains("handicap")) {
          seat.classList.add("disabled");
        }
      });
    } else {
      this.$seatBtn.forEach((seat) => {
        if (seat.classList.contains("handicap")) {
          seat.classList.remove("disabled");
        }
      });
      this.$checkHandicap.disabled = false;
    }
  };

  handicapActive = () => {
    this.$checkHandicap.addEventListener("click", () => {
      if (this.$checkHandicap.checked) {
        this.$seatBtn.forEach((seat) => {
          if (!seat.classList.contains("handicap")) {
            seat.classList.add("disabled");
          }
        });
      } else {
        this.$seatBtn.forEach((seat) => {
          if (!seat.classList.contains("handicap")) {
            seat.classList.remove("disabled");
          }
        });
      }
      if (this.seatList[0] === "handicap") {
        let confirm_check = window.confirm(
          `선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?`
        );
        if (confirm_check === true) {
          this.setInit(this.$seatBtn, this.$adultBtns, this.$youthBtns);
        } else {
          return;
        }
      }
    });
  };

  clickSeat = () => {
    this.$seatBtn.forEach((seat) => {
      seat.addEventListener("click", () => {
        if (seat.classList.contains("clicked")) {
          let index = this.seatList.indexOf(seat.innerHTML);
          this.seatList.splice(index, 1);
          seat.classList.remove("clicked");
          return;
        }

        if (seat.classList.contains("musseukbox")) {
          if (
            this.totalNum % 2 !== 0 ||
            this.adultNum % 2 !== 0 ||
            this.youthNum % 2 !== 0
          ) {
            window.alert(
              `선택하신 ‘MUSSEUKBOX’ 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요.`
            );
            return;
          }
          this.seatList.push("musseukbox");
          this.checkActiveSeat("musseukbox");
        } else if (seat.classList.contains("handicap")) {
          if (!this.$checkHandicap.checked) {
            window.alert(
              `선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다.`
            );
            return;
          }
          this.seatList.push("handicap");

          this.checkActiveSeat("handicap");
        } else {
          this.seatList.push("normal");

          this.checkNormalSeat();
        }
        if (seat.classList.contains("clicked")) {
          seat.classList.remove("clicked");
        } else {
          seat.classList.add("clicked");
        }

        if (this.seatList.length >= this.totalNum) {
          this.$seatBtn.forEach((seat) => {
            if (!seat.classList.contains("clicked")) {
              seat.classList.add("disabled");
            }
          });
          return;
        }
        console.log(this.seatList, this.totalNum);
      });
    });
  };

  checkActiveSeat = (type) => {
    this.$seatBtn.forEach((seat) => {
      if (!seat.classList.contains(type)) {
        seat.classList.add("disabled");
      }
    });
  };

  checkNormalSeat = () => {
    this.$seatBtn.forEach((seat) => {
      if (
        seat.classList.contains("musseukbox") ||
        seat.classList.contains("handicap")
      ) {
        seat.classList.add("disabled");
      }
    });
  };

  seatActive = () => {
    if (this.totalNum >= 1) {
      this.$seatBtn.forEach((seat) => {
        seat.classList.remove("disabled");
      });
    }
  };

  render = () => {
    this.checkDisable();
    this.checkBtns(this.$adultBtns);
    this.checkBtns(this.$youthBtns);
    this.handicapActive();
    this.clickSeat();
  };
}
