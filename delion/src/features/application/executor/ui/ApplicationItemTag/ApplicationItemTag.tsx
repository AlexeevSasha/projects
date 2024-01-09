import { memo } from 'react';
import type { Application } from '@entities/application';
import { Tag } from '@shared/ui';

export const ApplicationItemTag = memo((props: Application) => {
  const {
    isApplicationExecuted,
    isApplicationExecutionTypeIndependent,
    isApplicationExecutionTypeOrganization,
    isApplicationInExecute,
    applicationProgressInfo,
  } = props;

  switch (true) {
    case isApplicationInExecute:
      return <Tag title='На исполнении' type='organization' />;
    case isApplicationExecuted:
      return <Tag title='Исполнена' type='success' />;
    case isApplicationExecutionTypeIndependent: {
      return (
        <Tag
          progress={{
            count: applicationProgressInfo?.completed,
            total: applicationProgressInfo?.total,
            color: 'blue',
          }}
        />
      );
    }
    default:
      return (
        <Tag
          type={isApplicationExecutionTypeOrganization ? 'organization' : 'blue'}
          title='Не исполнена'
        />
      );
  }
});

ApplicationItemTag.displayName = 'ApplicationItemTag';
