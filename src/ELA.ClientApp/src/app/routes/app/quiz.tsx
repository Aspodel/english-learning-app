import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/quiz')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/quiz"!</div>
}
