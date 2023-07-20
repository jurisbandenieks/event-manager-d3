# React Timeline manager component with D3.js

View and manage resources on a timeline

## Installation

`npm install @event-manager/react-d3`

## Usage

`import { EventManager } from '@event-manager/react-d3'`

![alt text](https://github.com/jurisbandenieks/event-manager-d3/blob/HEAD/images/event-manager-d3.png)

- This component provides tools for firing events but does not handle data processing.
- It is the responsibility of the user to determine how to interact with the data during these events.

## Used Types

```
Event {
  start: Date
  end?: Date
  title: string
  color?: string
}
```

```
Resource {
  id: string
  title: string
  label?: string
  events: Event[]
}
```

```
MonthYear {
  month: number
  year: number
}
```

```
ClickData = {
  event: Event
  resource: {
    id: string
    title: string
    label: string
  }
}
```

```
Page = {
current: number
size: number
count: number
total: number
}
```

```
handleClick(data: ClickData) => void
handleUpdateDate(data: MonthYear) => void
```

## Timeline Props

```
<EventManager
  data={data}
  // React MUI TextField
  search={
    <TextField
      variant='standard'
      label='Search'
      onChange={(e) => handleSearch(e.target.value)}
    />
  }
  // React MUI Pagination
  pagination={
    <TablePagination
      component='div'
      count={page.total}
      page={page.current}
      onPageChange={handleChangePage}
      rowsPerPage={page.count}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  }
  showLegend
  showTooltip
  loading={loading}
  onClick={handleClick}
  onUpdateDate={handleUpdateDate}
/>
```

```
Props = {
  resources: Resource[]
  tableId: ID
  hasWeekends?: boolean // default false
  flat?: boolean // default false
  showLegend?: boolean // default false
  showTooltip?: boolean // default false
  loading?: boolean // default false
  // slots
  search?: ReactElement<HTMLInputElement>
  pagination?: ReactElement<HTMLDivElement>
  //events
  onClick: (data: ClickData | undefined) => void
  onUpdateDate: (date: MonthYear) => void
}
```
