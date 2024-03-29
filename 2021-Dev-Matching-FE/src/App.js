import ProductListPage from "./ProductListPage.js";
import ProductDetailPage from "./ProductDetailPage.js";
import CartPage from "./CartPage.js";
import { init } from "./router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    $target.innerHTML = "";

    if (pathname === "/2021-Dev-Matching-FE/") {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf("/products/") === 0) {
      const [, , productid] = pathname.split("/");
      new ProductDetailPage({
        $target,
        productid,
      }).render();
    } else if (pathname === "/cart") {
      new CartPage({
        $target,
      }).render();
    }
  };
  init(this.route);

  this.route();

  window.addEventListener("popstate", this.route);
}
