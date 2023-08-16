import { FunctionComponent } from 'react'

import classes from './total.module.scss'

interface Props {
  amount: number
}

export const Total: FunctionComponent<Props> = ({ amount }) => {
return <div className={classes.total}>Total: {amount}</div>
}