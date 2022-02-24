import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({
  pizzalist,
  adamin,
}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta
          name='description'
          content='Best pizza shop in town'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <Featured/> */}
      {adamin && (
        <AddButton setClose={setClose} />
      )}
      <PizzaList pizzalist={pizzalist} />
      {adamin && !close && (
        <Add setClose={setClose} />
      )}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req?.cookies || "";
  let adamin = false;
  if (cookie.token === process.env.TOKEN) {
    adamin = true;
  }
  const res = await axios.get(
    "http://localhost:3000/api/products"
  );
  return {
    props: {
      adamin,
      pizzalist: res.data,
    },
  };
};
