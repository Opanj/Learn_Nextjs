// untuk detail product dan menyesuaikan dengan nama filenya

import { fetcher } from "@/lib/swr/fetcher";
import DetailProductView from "@/views/detailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";

function DetailProductPage() {
  // const router = useRouter();
  const { query } = useRouter();
  // console.log(query);

  // melakukan dynamic routing untuk detail product
  // menggunakan useRouter
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/product/${query.product}`,
    fetcher
  );

  // console.log(data);

  return (
    <div>
      <h1>Detail Product</h1>
      <p>Product : {query.product}</p>
      {/* client-side */}
      <DetailProductView product={isLoading ? {} : data.data} />
    </div>
  );
}

export default DetailProductPage;

// useRouter digunakan untuk menangkap semua query di url
