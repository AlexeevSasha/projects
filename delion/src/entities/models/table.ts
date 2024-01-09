import type { FilterValue } from 'antd/es/table/interface';
import type { GetFilterParams } from '@shared/api/models';

export interface TableParams extends GetFilterParams {
  filters?: Record<string, FilterValue>;
}
