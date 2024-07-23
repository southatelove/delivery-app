import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function InfoProduct() {
  const data = useLoaderData() as { data: Product };

  // const data = useLoaderData() as Product;
  // return <div>{data.id}</div>;

  return (
    <>
      <Suspense fallback={<>Загрузка...</>}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => <div>{data.name}</div>}
        </Await>
      </Suspense>
    </>
  );
}
