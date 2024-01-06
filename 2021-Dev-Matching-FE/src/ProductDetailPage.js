import { request } from "./api.js"
import ProductDetail from "./ProductDetail.js"

export default function ProductDetailPage({ $target, productid }) {
    this.state = {
        productid,
        product: null
    }

    const $page = document.createElement('div')
    $page.className = 'ProductDetailPage'
    $page.innerHTML = '<h1>상품 정보</h1>'

    this.render = () => {
        $target.appendChild($page)
    }

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        if (!this.state.product) {
            $target.innerHTML = "Loading ..."
        } else {
            $target.innerHTML = ''
            $target.appendChild($page)
        }
    }

    this.fetchProduct = async () => {
        const { productid } = this.state
        const product = await request(`/products/${productid}`)
        this.setState({
            ...this.state,
            product
        })

        const productDetail = new ProductDetail({
            $target: $page,
            initialState: {
                product: this.state.product,
                selectedOptions: []
            }
        })
    }
    this.fetchProduct()
}