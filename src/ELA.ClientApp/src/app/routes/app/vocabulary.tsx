import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/vocabulary')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/vocabulary"!</div>
}
