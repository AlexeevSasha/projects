import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { List } from 'antd';
import classNames from 'classnames';
import { LeftArrowCircle } from '@shared/assets/icons/LeftArrowCircle';
import type { IKnowledgeData } from '@shared/const';
import { Button } from '@shared/ui';
import { Drawer } from '@shared/ui/Drawer/Drawer';
import { drawer, useDebouncePopup } from '@shared/ui/popup';
import type { IKnowledgeDrawer } from '@shared/ui/popup';
import css from './KnowledgeDrawer.module.scss';

export const KnowledgeDrawer = ({
  id,
  dataSource,
  title = 'База знаний',
  activeId,
}: IKnowledgeDrawer) => {
  const [content, setContent] = useState<IKnowledgeData['description'] | null>(null);
  const showList = () => setContent(null);
  const { closePopup, isClose } = useDebouncePopup({
    cb: () => {
      drawer.close(id);
    },
    delay: 300,
  });

  useEffect(() => {
    if (activeId) {
      const element = dataSource.find((el) => el.id == activeId);
      element && setContent(element.description);
    }
  }, [activeId]);

  const renderTitle = useMemo(() => {
    if (!content) return title;
    return (
      <>
        <div className={css.back}>
          <Button icon={<LeftOutlined />} size={'small'} onClick={showList}>
            {title}
          </Button>
        </div>
        <div className={css.back__mobile}>
          <span onClick={showList}>
            <LeftArrowCircle />
          </span>
          <div> {title}</div>
        </div>
      </>
    );
  }, [title, content]);

  return (
    <Drawer
      className={classNames({ [css.contentDrawer]: content })}
      zIndex={10000}
      title={renderTitle}
      open={!isClose}
      onClose={closePopup}
    >
      <KnowledgeList
        onClose={closePopup}
        content={content}
        dataSource={dataSource}
        setContent={setContent}
      />
    </Drawer>
  );
};

interface IKnowledgeList {
  content: ReactNode;
  dataSource: IKnowledgeData[];
  setContent: (v: ReactNode) => void;
  onClose: () => void;
}

const KnowledgeList = ({ content, setContent, dataSource, onClose }: IKnowledgeList) => {
  if (content)
    return (
      <div className={css.container}>
        <div className={css.container__content}>{content}</div>
        <div className={css.container__bottom}>
          <Button fullWidth type={'primary'} onClick={onClose}>
            Понятно
          </Button>
        </div>
      </div>
    );

  return (
    <List
      className={css.list}
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item
          actions={[<RightOutlined key={0} />]}
          onClick={() => setContent(item.description)}
          style={{ cursor: 'pointer' }}
        >
          {item.title}
        </List.Item>
      )}
    />
  );
};
