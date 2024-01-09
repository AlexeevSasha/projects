import { useEffect, useState } from 'react';
import { cashCatalogue, useStores } from '@shared/lib';

const names = [
  'Snils',
  'Birthday',
  'CategoryDocument',
  'Document',
  'DreamCategory',
  'PresentLink',
  'ThemeSpecification',
  'ParentInfo',
] as const;

export const useCategoryModerator = () => {
  const [loaded, setLoaded] = useState(false);
  const { catalogueS } = useStores();

  useEffect(() => {
    if (cashCatalogue.loaded) {
      setLoaded(true);
      return;
    }
    const requests = names.map((el) =>
      catalogueS.request[`getModeration${el}`]
        .request()
        .then((res) => ({ id: el, options: res?.data || [] })),
    );
    Promise.all(requests).then((data) => {
      data.forEach(({ id, options }) => cashCatalogue.set(id, options));
      cashCatalogue.loaded = true;
      setLoaded(true);
    });
  }, []);

  return loaded;
};
