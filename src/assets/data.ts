import { Event, Resource, addDays } from '../'

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const eventTypeLib = [
  { label: 'Sick Day', color: '#EF5350' },
  { label: 'Personal Day', color: '#26A69A' },
  { label: 'Anuall leave', color: '#FFA726' },
  { label: 'Other', color: '#42A5F5' },
]

export const generateResources = (): Resource[] => {
  const resources: Resource[] = []

  for (let i = 1; i <= 10; i++) {
    const resource: Resource = {
      id: i.toString(),
      title: `Resource ${i}`,
      events: [],
    }

    const eventCount = getRandomInt(1, 5)

    for (let j = 0; j < eventCount; j++) {
      const type = eventTypeLib[getRandomInt(0, 3)]
      const start = addDays(new Date(), getRandomInt(-20, 10))
      const end = addDays(start, getRandomInt(1, 24))
      const color = type.color
      const title = type.label

      const event: Event = {
        start,
        end,
        color,
        title,
      }

      resource.events.push(event)
    }

    resources.push(resource)
  }

  return resources
}

// Call the generateResources function to get the array of 100 resources
export const resources: Resource[] = generateResources()
