import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { ClickData, Event, Resource } from '../..'
import styles from './styles.module.scss'
import { useResourcesByEventTypes } from '../../hooks'

type Props = {
  data: Resource[]
  showTooltip: boolean
}

export const Chart: React.FC<Props> = ({ data, showTooltip }) => {
  const chartRef = useRef<SVGSVGElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  const resourcesByEventTypes = useResourcesByEventTypes(data)

  useEffect(() => {
    const width = chartRef.current?.parentElement?.clientWidth || 800
    const height = 400
    const margin = { top: 10, right: 100, bottom: 30, left: 100 }

    const svg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height)

    const xScale = d3
      .scaleTime()
      .domain([new Date(2023, 6, 1), new Date(2023, 6, 31)]) // Customize the date range
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleBand()
      .domain(resourcesByEventTypes.map((resource) => resource.id))
      .range([height - margin.bottom, margin.top])
      .padding(0.2)

    const xAxis = d3.axisBottom(xScale)
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat(
        (resourceId) =>
          resourcesByEventTypes.find((resource) => resource.id === resourceId)
            ?.title ?? resourceId,
      )
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)

    // Select all event rectangles
    const eventRects = svg
      .selectAll(`.${styles.eventRect}`)
      .data(
        resourcesByEventTypes.flatMap((resource) => {
          return resource.events.map((event) => ({ resource, event }))
        }),
      )
      .enter()
      .append('rect')
      .attr('class', styles.eventRect)
      .attr('x', (d) => xScale(d.event.start))
      .attr('y', 0) // Start at the top initially
      .attr(
        'width',
        (d) => xScale(d.event.end || d.event.start) - xScale(d.event.start),
      )
      .attr('height', yScale.bandwidth())
      .style('fill', (d) => d.event.color || 'steelblue')
      .on('mouseenter', handleMouseEnter)
      .on('mouseleave', handleMouseOut)

    eventRects
      .transition()
      .duration(200) // Set the duration of the animation
      .delay((d, i) => i * 5) // Add a delay for staggered animation
      .attr('y', (d) => yScale(d.resource.id) || 0)

    function handleMouseEnter(d: any) {
      d3.select(d.currentTarget).style(
        'box-shadow',
        '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
      )
      if (showTooltip) {
        const tooltip = d3.select(tooltipRef.current)
        const data = d.target.__data__ as ClickData
        const resource = data.resource
        const event = data.event as Event

        if (event) {
          const tooltipContent = `
              <strong>${resource?.label ?? ''}</strong><br>
              ${event.title}<br>
              ${formatDate(event.start)} - ${formatDate(
            event.end || event.start,
          )}
            `

          tooltip
            .html(tooltipContent)
            .style('left', `${d.pageX - 8}px`)
            .style('top', `${d.pageY + 8}px`)
            .style('opacity', 0.9)
        }
      }
    }

    function handleMouseOut(d: any) {
      d3.select(d.currentTarget).style('box-shadow', '0')

      d3.select(tooltipRef.current).style('opacity', 0)
    }

    // Helper function to format date as "MM/DD/YYYY"
    function formatDate(date: Date) {
      const month = date.getMonth() + 1
      const day = date.getDate()
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    }
  }, [data])

  return (
    <>
      <svg ref={chartRef}></svg>
      <div ref={tooltipRef} className={styles.tooltip}></div>
    </>
  )
}
