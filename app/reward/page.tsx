import RewardsPage from './RewardsPage';
import SessionWrapper from '@/components/SessionWrapper';

export const dynamic = 'force-dynamic'; 

export default function Page() {
  return (
    <SessionWrapper>
      <RewardsPage />
    </SessionWrapper>
  );
}