import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'

import cart from '../../assets/cart.svg'
import classes from './cart.module.scss'

interface Props {
  productsCount: number
}

export const CartWidget: FunctionComponent<Props> = ({ productsCount }) => {
  const navigate = useNavigate()

  const redirectCart = () => {
    navigate('/cart')
  }

  return (
    <button className={classes.container} onClick={redirectCart}>
      <span className={classes.count}>{productsCount}</span>
      <img src={cart} className={classes.cart} alt="Proceed to cart" />
    </button>
  )
}