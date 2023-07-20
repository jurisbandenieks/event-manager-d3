import React, { useState } from 'react'
import { MonthYear, Props, formatMonthYear, getYearAndMonth } from '../..'
import styles from './styles.module.scss'
import { Chart, Legend, Actions, Loading } from '../'
import { useResourcesByEventTypes } from '../../hooks'

export const EventManager: React.FC<Props> = ({
  data,
  showLegend = false,
  showTooltip = false,
  pagination = null,
  search = null,
  loading = false,
  onClick,
  onUpdateDate,
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth())

  const resourcesByEventTypes = useResourcesByEventTypes(data)

  const updateDate = (date: MonthYear) => {
    setMonthYear(date)
    onUpdateDate(date)
  }

  return (
    <div className={styles.container}>
      <div className={styles.timelineHeadline}>
        {search}
        <div className={styles.monthYear}>{formatMonthYear(monthYear)}</div>
        <Actions monthYear={monthYear} onUpdate={updateDate} />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <Chart
          data={resourcesByEventTypes}
          showTooltip={showTooltip}
          monthYear={monthYear}
          onClick={onClick}
        />
      )}

      <div className={styles.footer}>
        {showLegend && <Legend resources={data} />}
        {pagination}
      </div>
    </div>
  )
}
