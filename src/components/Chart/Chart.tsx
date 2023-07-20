import React, { useEffect, useRef } from 'react'
import { select, scaleTime, scaleBand, axisBottom, axisLeft } from 'd3'
import { ClickData, Event, MonthYear, Resource, getDayMonth } from '../..'
import styles from './styles.module.scss'

type Props = {
  data: Resource[]
  monthYear: MonthYear
  showTooltip: boolean
  onClick: (data: ClickData) => void
}

export const Chart: React.FC<Props> = ({
  data,
  showTooltip,
  monthYear,
  onClick,
}) => {
  const chartRef = useRef<SVGSVGElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log(data)
    const firstDay = new Date(monthYear.year, monthYear.month - 1, 1)
    const lastDay = new Date(monthYear.year, monthYear.month, 0)

    const width = chartRef.current?.parentElement?.clientWidth || 800
    const height = 400
    const margin = { top: 10, right: 100, bottom: 30, left: 100 }

    select(chartRef.current).selectAll('g.axis').remove()

    // Canvas
    const svg = select(chartRef.current)
      .attr('width', width)
      .attr('height', height)

    // X axis
    const xScale = scaleTime()
      .domain([firstDay, lastDay]) // Customize the date range
      .range([margin.left, width - margin.right])

    const xAxis = axisBottom(xScale).tickSize(0).ticks(31)

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

    // Y axis
    const yScale = scaleBand()
      .domain(data.map((resource) => resource.id))
      .range([height - margin.bottom, margin.top])
      .padding(0.4)

    const yAxis = axisLeft(yScale)
      .tickFormat(
        (resourceId) =>
          data.find((resource) => resource.id === resourceId)?.title ??
          resourceId,
      )
      .tickSize(0)

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${margin.left}, 0)`)

      .call(yAxis)

    // Select all event rectangles
    const eventRects = svg.selectAll(`.${styles.eventRect}`).data(
      data.flatMap((resource) => {
        return resource.events.map((event) => ({ resource, event }))
      }),
    )

    // Remove the old event rectangles that are no longer needed
    eventRects.exit().remove()

    // Update rects
    eventRects
      .attr('class', styles.eventRect)
      .attr('x', (d) => xScale(d.event.start))
      .attr('y', (d) => yScale(d.resource.id) || 0)
      .attr(
        'width',
        (d) => xScale(d.event.end || d.event.start) - xScale(d.event.start),
      )
      .attr('height', yScale.bandwidth())
      .style('fill', (d) => d.event.color || 'steelblue')
      .on('mouseenter', handleMouseEnter)
      .on('mouseleave', handleMouseOut)
      .on('mouseup', handleClick)

    // Create rects
    eventRects
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
      .on('mouseup', handleClick)

    // Rects animation
    eventRects
      .transition()
      .duration(200) // Set the duration of the animation
      .delay((_d, i) => i * 5) // Add a delay for staggered animation
      .attr('y', (d) => yScale(d.resource.id) || 0)

    function handleClick(d: any) {
      const data = d.target.__data__ as ClickData
      const resource = data.resource
      const event = data.event as Event

      onClick({ resource, event })
    }

    function handleMouseEnter(d: any) {
      select(d.currentTarget).style(
        'box-shadow',
        '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
      )
      if (showTooltip) {
        const tooltip = select(tooltipRef.current)
        const data = d.target.__data__ as ClickData
        const resource = data.resource
        const event = data.event as Event

        if (event) {
          const tooltipContent = `
              <strong>${resource?.label ?? ''}</strong><br>
              ${event.title}<br>
              ${getDayMonth(event.start)} - ${getDayMonth(
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
      select(d.currentTarget).style('box-shadow', '0')

      select(tooltipRef.current).style('opacity', 0)
    }
  }, [data, monthYear])

  return (
    <div className={styles.container}>
      <svg ref={chartRef}></svg>
      <div ref={tooltipRef} className={styles.tooltip}></div>
    </div>
  )
}
