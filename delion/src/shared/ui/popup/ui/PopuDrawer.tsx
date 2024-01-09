import type { DrawerProps } from 'antd';
import { Drawer } from '@shared/ui/Drawer/Drawer';
import { useDebouncePopup } from '@shared/ui/popup';
import { drawer } from '@shared/ui/popup';

interface IProps {
  id: string;
  details: DrawerProps;
}

export const PopupDrawer = ({ id, details }: IProps) => {
  const { closePopup, isClose } = useDebouncePopup({
    cb: () => {
      drawer.close(id);
    },
    delay: 300,
  });

  return (
    <Drawer {...details} open={!isClose} onClose={closePopup}>
      {details.children}
    </Drawer>
  );
};
