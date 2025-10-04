import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/quizzes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/quizzes"!</div>
}
