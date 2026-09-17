import { CheckCircle, Clock, HelpCircle } from 'lucide-react';

type Status = 'verified' | 'under_review' | 'unverified';

interface VerificationBadgeProps {
  status: Status;
}

export function VerificationBadge({ status }: VerificationBadgeProps) {
  const config = {
    verified: {
      icon: CheckCircle,
      label: 'Verified',
      className: 'bg-primary text-primary-foreground border border-primary/20',
    },
    under_review: {
      icon: Clock,
      label: 'Under review',
      className: 'bg-secondary text-secondary-foreground border border-border',
    },
    unverified: {
      icon: HelpCircle,
      label: 'Unverified',
      className: 'bg-muted text-muted-foreground border border-border/50',
    },
  };

  const { icon: Icon, label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${className}`}
      title={status === 'verified' ? 'Verified via cross-reference' : ''}
    >
      <Icon className="w-4 h-4" />
      {label}
    </span>
  );
}
