import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportCsv(rows, filename) {
  const headers = Object.keys(rows[0] || {})
  const csv = [headers.join(','), ...rows.map((row) => headers.map((key) => `"${row[key] ?? ''}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

export function exportWorkoutPdf(session) {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text(`Workout Summary - ${session.name}`, 14, 18)
  doc.setFontSize(11)
  doc.text(`Date: ${session.date}`, 14, 26)
  autoTable(doc, {
    startY: 34,
    head: [['Exercise', 'Set', 'Reps', 'Weight']],
    body: session.exercises.flatMap((exercise) =>
      exercise.sets.map((set, index) => [exercise.name, index + 1, set.reps, set.weight]),
    ),
    theme: 'grid',
  })
  doc.save(`gymbuddy-${session.date}.pdf`)
}
