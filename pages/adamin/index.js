import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ products, orders }) => {
  const [productList, setPorductList] =
    useState(products);
  const [orderList, setOrderList] =
    useState(orders);

  const duration = [
    "preparing",
    "on the way",
    "done",
    "delete",
  ];

  const productDelete = async (id) => {
    const res = await axios.delete(
      "http://localhost:3000/api/products/" + id
    );
    const newProducts = productList.filter(
      (product) => product._id !== id
    );
    setPorductList(newProducts);
  };

  const orderUpdate = async (id) => {
    const order = orderList.filter(
      (order) => order._id === id
    )[0];
    const currentStatus = order.status;
    const res = await axios.put(
      "http://localhost:3000/api/orders/" + id,
      { status: currentStatus + 1 }
    );
    console.log(res);
    setOrderList([
      res.data,
      ...orderList.filter(
        (order) => order._id !== id
      ),
    ]);
  };
  const orderDelete = async (id) => {
    const res = await axios.delete(
      "http://localhost:3000/api/orders/" + id
    );
    setOrderList([
      ...orderList.filter(
        (order) => order._id !== id
      ),
    ]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {productList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit='cover'
                    alt=''
                  />
                </td>
                <td>
                  {product._id.slice(0, 5)}...
                </td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button
                    className={styles.button}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() =>
                      productDelete(product._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  {order.status === 0 ? (
                    <span>cash</span>
                  ) : (
                    <span>paid</span>
                  )}
                </td>
                <td>{duration[order.status]}</td>
                <td>
                  {order.status > 2 ? (
                    <button
                      className={
                        styles.orderDeleteButton
                      }
                      onClick={() =>
                        orderDelete(order._id)
                      }
                    >
                      delete
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        orderUpdate(order._id)
                      }
                    >
                      Next Stage
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/adamin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get(
    "http://localhost:3000/api/products"
  );
  const orderRes = await axios.get(
    "http://localhost:3000/api/orders"
  );

  return {
    props: {
      products: productRes.data,
      orders: orderRes.data,
    },
  };
};

export default Index;
