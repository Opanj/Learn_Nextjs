// SERVER-SIDE RENDERING = melakukan render disisi server dan dikembalikan ke ui

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

// function bawaan dari serverside yaitu dari nextjs getserversideprops
// yg akan di panggil setiap melakukan request
export async function getServerSideProps() {
  // fetch data
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
}
