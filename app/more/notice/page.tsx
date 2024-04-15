'use client';

import MoreLayout from '@/app/more/components/MoreLayout';
import UpdateLog from '@/app/more/components/UpdateLog';

export default function Notice() {
  return (
    <MoreLayout title="공지사항">
      <div className="notice-content">
        <UpdateLog count={0} />
      </div>
    </MoreLayout>
  );
}
