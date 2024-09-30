// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  data: any; // dikarenakan datanya belum diketahui maka valuenya menjadi any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const data = [
  //   {
  //     id: 1,
  //     name: "Brodo",
  //     price: 500000,
  //     size: "xl",
  //   },
  //   {
  //     id: 2,
  //     name: "Adidas Sport",
  //     price: 900000,
  //     size: "l",
  //   },
  //   {
  //     id: 3,
  //     name: "Nike Airforce",
  //     price: 1500000,
  //     size: "xl",
  //   },
  // ];

  // melakukan cek data di database dan memanggil retrieveDataById
  if (req.query.product![1]) {
    const data = await retrieveDataById("products", req.query.product![1]);
    res.status(200).json({ status: true, statusCode: 200, data });
  }
  // console.log(req.query.product![1]); // ['product', '123'] 2 buah value didalam array dan diambil value ke2 [1]

  const data = await retrieveData("products"); // mengambil semua data
  res.status(200).json({ status: true, statusCode: 200, data });
}

// agar bisa melakukan dynamic route maka file product ini akan bisa ditangkap [[...product]].tsx
