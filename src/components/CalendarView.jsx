import { eachDayOfInterval, endOfWeek, format, isSameDay, startOfWeek, subDays } from 'date-fns'

export function CalendarView({ logs }) {
  const start = startOfWeek(subDays(new Date(), 27), { weekStartsOn: 1 })
  const end = endOfWeek(new Date(), { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start, end })
  return (
    <div className="calendar-grid">
      {days.map((day) => {
        const trained = logs.some((log) => isSameDay(new Date(log.date), day))
        return (
          <div key={day.toISOString()} className={`calendar-day ${trained ? 'calendar-day-active' : ''}`}>
            <span>{format(day, 'd')}</span>
          </div>
        )
      })}
    </div>
  )
}
