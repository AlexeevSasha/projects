import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';

export interface IContentStatusApplication {
  title: string;
  description: ReactNode;
  image_url: StaticImageData;
  titleIcon?: ReactNode;
  action?: ReactNode;
  errors?: string[];
}

export interface TrusteeUploadReport {
  report_ids: number[];
  report_text: string;
}
