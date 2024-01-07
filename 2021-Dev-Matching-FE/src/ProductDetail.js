import SelectedOptions from "./SelectedOptions.js";

export default function ProductDetail({ $target, initialState }) {
  const $productDetail = document.createElement("div");
  $productDetail.className = "ProductDetail";

  $target.appendChild($productDetail);

  this.state = initialState;

  let selectedOptions = null;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();

    if (selectedOptions) {
      selectedOptions.setState({
        selectedOptions: this.state.selectedOptions,
      });
    }
  };

  this.render = () => {
    const { product } = this.state;

    $productDetail.innerHTML = `
          <img src="${product.imageUrl}">
          <div class="ProductDetail__info">
            <h2>${product.name}</h2>
            <div class="ProductDetail__price">${product.price}원~</div>
            <select>
              <option>선택하세요.</option>
              ${product.productOptions
                .map(
                  (option) =>
                    `
                  <option value="${option.id}" ${
                      option.stock === 0 ? "disabled" : ""
                    }>
                    ${option.stock === 0 ? "(품절) " : ""}${product.name} ${
                      option.name
                    } ${option.price > 0 ? `(+${option.price}원)` : ""}
                  </option>
                `
                )
                .join("")}
            </select>
            <div class="ProductDetail__selectedOptions"></div>
          </div>
        `;

    selectedOptions = new SelectedOptions({
      $target: $productDetail.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      },
    });
  };
  this.render();

  $productDetail.addEventListener("change", (e) => {
    // 이벤트 발생 주체가 select 태그인 경우에만
    if (e.target.tagName === "SELECT") {
      // 상품 옵션을 나타내는 option의 value에는 optionId를 담고 있습니다.
      // 이를 가져와서 숫자값을 바꿉니다.
      const selectedOptionId = parseInt(e.target.value);
      const { product, selectedOptions } = this.state;
      // 상품의 옵션 데이터에서 현재 선택한 optionId가 존재하는지 찾습니다.
      const option = product.productOptions.find(
        (option) => option.id === selectedOptionId
      );
      // 이미 선택한 상품인지 선택된 상품 데이터에서 찾아봅니다.
      const selectedOption = selectedOptions.find(
        (selectedOption) => selectedOption.optionId === selectedOptionId
      );

      // 존재하는 옵션이고 선택된 옵션이 아닌 경우에만 selectedOptions에 현재 선택한
      // 옵션을 추가합니다.
      if (option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];
        console.log(nextSelectedOptions);
        this.setState({
          product: this.state.product,
          selectedOptions: nextSelectedOptions,
        });
      }
    }
  });
}
