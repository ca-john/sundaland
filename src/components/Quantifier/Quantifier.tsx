import { FunctionComponent, useState } from 'react'

import styles from './quantifier.module.scss'

export type Operation = 'reduce' | 'add'

interface Props {
  removeProductCallback: (productId: number) => void
  handleUpdateQuantity: (productId: number, operation: Operation) => void
  productId: number
}


export const Quantifier: FunctionComponent<Props> = ({ removeProductCallback, handleUpdateQuantity, productId }) => {
  const [value, setValue] = useState<number>(1)

  const reduce = ():void => {
    handleUpdateQuantity(productId, 'reduce')

    setValue(prevState => {
      const updatedValue = prevState - 1
      if (updatedValue === 0) {
        removeProductCallback(productId)
      }
      return updatedValue
    })
  }

  const increase = ():void => {
    handleUpdateQuantity(productId, 'add')
    setValue(prevState => prevState + 1)
  }

  return (
    <div className={styles.quantifier}>
      <input type="button" value="-" className={styles.buttonMinus} onClick={reduce} />
      <input type="number"
             step="1"
             max=""
             value={value}
             onChange={e => setValue(parseInt(e.target.value))}
             className={styles.quantityField} />
      <input type="button" value="+" className={styles.buttonPlus} onClick={increase} />
    </div>
  )
}