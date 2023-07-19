import { useMemo, useState } from 'react'
import { Event, Resource } from '.'

export const useResourcesByEventTypes = (resources: Resource[]): Resource[] => {
  const [resourcesByEventTypes, setResourcesByEventTypes] = useState<
    Resource[]
  >([])

  useMemo(() => {
    const newMappedResources = resources.flatMap((resource) => {
      const eventsByType: {
        [title: string]: { title: string; events: Event[] }
      } = {}
      const mappedEvents: Resource[] = []

      for (const event of resource.events) {
        if (event.title in eventsByType) {
          eventsByType[event.title].events.push(event)
        } else {
          eventsByType[event.title] = { title: event.title, events: [event] }
        }
      }

      let suffix = 1
      for (const type in eventsByType) {
        const uniqueId = `${resource.id}-${suffix}` // Generate a unique identifier
        mappedEvents.push({
          id: uniqueId,
          title: suffix === 1 ? resource.title : '',
          label: resource.title,
          events: eventsByType[type].events,
        })
        suffix++
      }

      return mappedEvents
    })

    setResourcesByEventTypes(newMappedResources.reverse())
  }, [resources])

  return resourcesByEventTypes
}
