'use client';

import UpdateLog from '@/components/common/UpdateLog';
import MoreLayout from '@/components/layout/more-layout';

export default function Notice() {
  return (
    <MoreLayout title="공지사항">
      <div className="notice-content">
        <UpdateLog count={0} />
      </div>
    </MoreLayout>
  );
}
