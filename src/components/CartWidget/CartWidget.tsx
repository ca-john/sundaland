import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

import cart from '../../assets/cart.svg'
import styles from './cart.module.scss'

interface Props {
  productsCount: number
}

export const CartWidget: FunctionComponent<Props> = ({ productsCount }) => {
  const navigate = useNavigate()

  const redirectCart = () => {
    navigate('/cart')
  }

  return (
    <button className={styles.container} onClick={redirectCart}>
      <span className={styles.count}>{productsCount}</span>
      <img src={cart} className={styles.cart} alt="Proceed to cart" />
    </button>
  )
}