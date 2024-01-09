import React from 'react';
import { MobXProviderContext } from 'mobx-react';
// avoid another boundary errors
// eslint-disable-next-line boundaries/element-types
import type { RootStore } from '@app/store/RootStore';

export function useStores(): RootStore {
  return React.useContext(MobXProviderContext) as RootStore;
}
