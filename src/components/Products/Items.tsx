import { FunctionComponent, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import styles from './items.module.scss'
import { Loader } from '../Loader'

const ENDPOINT = 'https://dummyjson.com/products'


// This is the type of the data that we get from the API
export type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  image: string
  quantity: number
  description: string
}


export interface CartProps {
  [productId: string]: Product
}

export const Products: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState(false)
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})


  useEffect(() => {
    getData(ENDPOINT)
  }, [])


  async function getData(url: string) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setIsLoading(false)
      } else {
        setError(true)
        setIsLoading(false)
      }
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }

  const addToCart = (product: Product):void => {
    product.quantity = 1

    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: product,
    }))
  }

  const isInCart = (productId: number):boolean => Object.keys(cart || {}).includes(productId.toString())

  if (error) {
    return <h3 className={styles.error}>There was an error, please try again.</h3>
  }

  if (isLoading) {
    return <Loader />
  }


  return (
    <section className={styles.productPage}>
      <h1>Products</h1>

      <div className={styles.container}>
        {products.map(product => (
          <div className={styles.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <div className={styles.description}>{product.description}</div>
            <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  )
}