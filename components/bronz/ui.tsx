export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true" className={className}>
      <path d="M1 5h16m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Plus({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
