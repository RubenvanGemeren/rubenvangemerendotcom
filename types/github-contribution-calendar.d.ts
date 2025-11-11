declare module 'github-contribution-calendar' {
  import React from 'react';

  export interface GitHubCalendarProps {
    username: string;
    token: string;
    year?: number | string;
    theme?: string;
    customTheme?: {
      noContributions?: string;
      low?: string;
      moderate?: string;
      high?: string;
      veryHigh?: string;
    };
    cellSize?: number | string;
    showLabels?: boolean;
    background?: string;
    borderRadius?: string;
    labelColor?: string;
    showTotalContributions?: boolean;
    fontSize?: number | string;
    titleColor?: string;
    showKeys?: boolean;
  }

  export const GitHubCalendar: React.FC<GitHubCalendarProps>;
}

