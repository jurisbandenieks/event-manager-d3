import React from 'react'
import styles from './Legend.module.scss'
import { Resource } from '../../types'

type Props = {
  resources: Resource[]
}

export const Legend: React.FC<Props> = ({ resources }) => {
  const typeList: { title: string; color?: string }[] = resources.flatMap(
    (resource) =>
      resource.events.map((event) => ({
        title: event.title,
        color: event.color,
      })),
  )

  const uniqueTypes = [
    ...new Map(typeList.map((item) => [item['title'], item])).values(),
  ]

  return (
    <div className={styles.legend}>
      {uniqueTypes.map((type) => (
        <div key={type.title} className={styles.type}>
          <span>
            <div
              className={styles.color}
              style={{ backgroundColor: type.color }}
            ></div>
          </span>
          {type.title}
        </div>
      ))}
    </div>
  )
}
