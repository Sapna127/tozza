import SessionWrapper from '@/components/SessionWrapper';
import TasksPage from './TasksPage';
export const dynamic = 'force-dynamic'; 

export default function Page() {
  return (
    <SessionWrapper>
      <TasksPage />
    </SessionWrapper>
  );
}