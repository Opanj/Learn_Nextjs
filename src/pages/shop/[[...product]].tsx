import { useRouter } from "next/router";

function ProductPage() {
  const { query } = useRouter();
  // console.log(query);
  return (
    <div>
      <h1>Halaman Product</h1>
      <p>
        Product :{" "}
        {`${query.product && query.product[0] + "-" + query.product[1]}`}
      </p>
    </div>
  );
}

export default ProductPage;

// bisa juga membuat category dengan [...slug].tsx
// [...slug].tsx (... untuk menangkap semua slug/productnya dirotingan)
// [[...slug]].tsx => agar tidak membuat file baru dan bisa diakses dari url filenya
