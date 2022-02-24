import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../redux/cartSlice";
import Link from "next/link";

const Product = ({pizza}) => {
  const [size, setSize] = useState(0);
  const [price,setPrice] = useState(pizza.prices[size]);
  const [options,setOptions] = useState([]);
  const [quantity,setQuantity] = useState(1);

  const dispatch = useDispatch()



  const changePrice = (diff) => {
    setPrice(price + diff)
  }

  const changeSizeHandler = (newSize) =>{

    const diff = pizza.prices[newSize] -  pizza.prices[size];
    setSize(newSize);
    changePrice(diff);
  }

  const onCheckHandler = (e,option) => {
    const checked = e.target.checked;

    if(checked){
      setOptions(prev => [...prev,option])
      changePrice(option.price);
    }else{
      setOptions(options.filter(opt => opt._id !== option._id))
      changePrice(-option.price);
    }
  }

  const clickHandler = () => {
    dispatch(addProducts({...pizza,price,options,quantity}))
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => changeSizeHandler(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => changeSizeHandler(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => changeSizeHandler(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {
            pizza.extraOptions.map(option => (
              <div className={styles.ingredients} key={option._id}>
                <div className={styles.option}>
                  <input
                  onChange={e => onCheckHandler(e,option)}
                    type="checkbox"
                    id={option.text}
                    name={option}
                    className={styles.checkbox}
                    />
                  <label htmlFor="double">{option.text}</label>
                </div>
              </div>
            ))
          }
        </div>
        <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity} onChange={e => setQuantity(e.target.value)}/>
        <Link href="/cart" passHref>
            <button className={styles.button} onClick={clickHandler}>Add to Cart</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({params}) =>{
  const res =await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props:{
      pizza : res.data
    }
  }
}
