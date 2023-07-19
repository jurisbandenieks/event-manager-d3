import React from 'react'
import { Props } from '../..'
import styles from './styles.module.css'
import { Chart } from '../Chart'
import { Legend } from '../Legend'

export const EventManager: React.FC<Props> = ({
  data,
  showLegend = false,
  showTooltip = false,
  pagination = null,
}) => {
  return (
    <div className={styles.container}>
      <Chart data={data} showTooltip={showTooltip} />

      <div className={styles.footer}>
        {showLegend && <Legend resources={data} />}
        {pagination}
      </div>
    </div>
  )
}
