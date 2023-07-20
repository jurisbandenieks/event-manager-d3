import React from 'react'
import styles from './Actions.module.scss'
import { MonthYear } from '../../types'
import { getYearAndMonth } from '../../utils'
import back from '../../assets/navigate_before.svg'
import next from '../../assets/navigate_next.svg'

type Props = {
  monthYear: MonthYear
  onUpdate: (date: MonthYear) => void
}

export const Actions: React.FC<Props> = ({ monthYear, onUpdate }) => {
  const handleBack = () => {
    let date
    if (monthYear.month <= 1) {
      date = { month: 12, year: monthYear.year - 1 }
    } else {
      date = { ...monthYear, month: monthYear.month - 1 }
    }
    onUpdate(date)
  }

  const handleForward = () => {
    let date
    if (monthYear.month >= 12) {
      date = { month: 1, year: monthYear.year + 1 }
    } else {
      date = { ...monthYear, month: monthYear.month + 1 }
    }
    onUpdate(date)
  }

  const handleToday = () => {
    onUpdate(getYearAndMonth())
  }

  return (
    <div className={styles.timelineActions}>
      <button className={styles.btn} onClick={handleBack}>
        <img src={back} alt='<' />
      </button>
      <button className={styles.btn} onClick={handleToday}>
        Today
      </button>
      <button className={styles.btn} onClick={handleForward}>
        <img src={next} alt='<' />
      </button>
    </div>
  )
}
