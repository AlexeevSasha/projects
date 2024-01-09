import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { Divider, Modal } from 'antd';
import { observer } from 'mobx-react';
import { TrusteeReportForm } from '@features/application/trustee';
import type { TrusteeUploadReport } from '@features/application/trustee/model/trustee';
import { useStores } from '@shared/lib';

interface IProps {
  button: ReactNode;
}

export const ApplicationReportModal = observer(({ button }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trusteeS } = useStores();

  const onSubmit = useCallback((values: TrusteeUploadReport) => {
    trusteeS.uploadReport(values).then((res) => {
      res && setIsModalOpen(false);
    });
  }, []);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>{button}</div>
      <Modal
        destroyOnClose
        width={1000}
        centered
        title='Отчет об исполнении'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Divider />
        <TrusteeReportForm onSubmit={onSubmit} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
});
