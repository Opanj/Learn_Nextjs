import styles from "./DetailProduct.module.scss";
import { ProductType } from "@/types/product.type";

function DetailProductView({ product }: { product: ProductType }) {
  return (
    <div>
      <div className={styles.detailProduct}>
        <div className={styles.detailProduct__image}>
          <img src={product.image} alt="product" />
        </div>
        <h4 className={styles.detailProduct__name}>{product.name}</h4>
        <p className={styles.detailProduct__category}>{product.category}</p>
        <p className={styles.detailProduct__price}>
          {/* jika product.price ada maka jalankan price */}
          {product.price &&
            product.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
        </p>
      </div>
    </div>
  );
}

export default DetailProductView;
