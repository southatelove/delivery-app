import { useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";

export function InfoProduct() {
  const data = useLoaderData() as Product;

  return <div>{data.id}</div>;
}
