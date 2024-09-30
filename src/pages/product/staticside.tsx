// STATIC SIDE GENERATION

import { ProductType } from "@/types/product.type";
import ProductView from "@/views/product";

function ProductPage(props: { products: ProductType[] }) {
  const { products } = props;
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
}

export default ProductPage;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
}
