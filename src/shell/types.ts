// Shared types for shell components
import type * as React from 'react';

export type NavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};