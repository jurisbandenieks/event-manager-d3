import React from 'react'
import { Resource } from '../..'
import styles from './styles.module.css'
import { Chart } from '../Chart'

type Props = {
  data: Resource[]
}

export const EventManager: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Chart data={data} />
    </div>
  )
}
