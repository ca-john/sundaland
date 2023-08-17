import { FunctionComponent } from 'react'

import styles from './total.module.scss'

interface Props {
  amount: number
}

export const Total: FunctionComponent<Props> = ({ amount }) => {
return <div className={styles.total}>Total: {amount}</div>
}