// CLIENT-SIDE RENDERING = dilakukan rendering pada sisi client

import { fetcher } from "@/lib/swr/fetcher";
import ProductView from "@/views/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// type ProductType = {
//   id: number;
//   name: string;
//   price: number;
//   size: string;
// };

function ProductPage() {
  // const [isLogin, setIsLogin] = useState(true);
  const [products, setProducts] = useState([]);
  const { push } = useRouter();

  // useEffect(() => {
  //   if (!isLogin) {
  //     console.log("cek login");
  //     push("/auth/login");
  //   }
  // }, []);
  // setting effect tanpa dependencies agar hanya dijalankan sekali, dengan eslinet didisable
  // bisa di dalam filenya dan di file eslint

  // fecth data product (termasuk contoh client side rendering)
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/product")
  //     .then((res) => res.json())
  //     .then((response) => setProducts(response.data));
  // }, []);

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/product",
    fetcher
  );

  // console.log(data);
  return (
    <div>
      <ProductView products={isLoading ? [] : data.data} />
    </div>
  );
}

export default ProductPage;

// daimamic roting di product dan buat file dengan [slug].tsx / [id].tsx
