import { FunctionComponent, useEffect } from 'react'
import useLocalStorageState from 'use-local-storage-state'


import { Quantifier } from '../Quantifier'
import { CartProps } from '../Products/Items.tsx'
import { Total } from '../Total'
import { Operation } from '../Quantifier/Quantifier.tsx'
import styles from './cart.module.scss'
import { useLocation } from 'react-router-dom'
import React from 'react'



export const Cart: FunctionComponent = () => {
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleRemoveProduct = (productId: number): void => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      delete updatedCart[productId]
      return updatedCart
    })
  }

  const handleUpdate = (productId: number, operation: Operation) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart }
      if (updatedCart[productId]) {
        if (operation === 'add') {
          updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity + 1 }
        } else {
          updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity - 1 }
        }
      }
      return updatedCart
    })
  }


  const getProducts = () => Object.values(cart || {})

  const totalPrice = getProducts().reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0)

  return (
    <section className={styles.cart}>
      <h1>Cart</h1>

      <div className={styles.container}>
        {getProducts().map(product => (
          <div className={styles.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <Quantifier
              removeProductCallback={() => handleRemoveProduct(product.id)}
              productId={product.id}
              handleUpdateQuantity={handleUpdate} />
          </div>
        ))}
      </div>
      <Total amount={totalPrice} />
    </section>
  )
}