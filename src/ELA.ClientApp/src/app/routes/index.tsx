import { createFileRoute } from '@tanstack/react-router'
import LandingPage from '../../components/common/landing-page';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <LandingPage />;
}
