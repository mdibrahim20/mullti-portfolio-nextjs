'use client';

import { useData } from '@/components/DataProvider';
import V1Shell from '@/app/_shells/V1Shell';
import Version1 from '@/app/_portfolios/Version1';
import Version2Client from '@/app/version2/Version2Client';
import Version3Client from '@/app/version3/Version3Client';
import Version4Client from '@/app/version4/Version4Client';

function normalizePortfolioKey(key: unknown): 'v1' | 'v2' | 'v3' | 'v4' {
  const k = String(key ?? '').toLowerCase().trim();
  if (k === '2' || k === 'v2' || k === 'version2') return 'v2';
  if (k === '3' || k === 'v3' || k === 'version3') return 'v3';
  if (k === '4' || k === 'v4' || k === 'version4') return 'v4';
  return 'v1';
}

export default function DynamicPortfolio() {
  const { data, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load portfolio</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const active = normalizePortfolioKey(
    data?.portfolioSettings?.active_version ??
    data?.siteConfig?.active_portfolio ??
    data?.siteConfig?.portfolio_version ??
    data?.siteConfig?.template ??
    data?.siteConfig?.theme
  );

  console.log(data?.siteConfig, '-> active portfolio:', active);

  switch (active) {
    case 'v2':
      return <Version2Client />;
    case 'v3':
      return <Version3Client />;
    case 'v4':
      return <Version4Client />;
    case 'v1':
    default:
      return (
        <V1Shell>
          <Version1 />
        </V1Shell>
      );
  }
}
