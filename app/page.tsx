import DynamicPortfolio from './DynamicPortfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My Portfolio Website',
};

export default function Home() {
  return <DynamicPortfolio />;
}
