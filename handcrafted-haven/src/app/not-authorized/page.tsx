'use client';

import Link from 'next/link';

export default function NotAuthorizedPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🚫 Access Denied</h1>
      <p>You are not authorized to view this page.</p>
      <Link href="/" style={{ marginTop: '1rem', display: 'inline-block' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
