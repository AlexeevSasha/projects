import React, { useCallback } from 'react';
import { Space, Typography } from 'antd';
import type { Application } from '@entities/application';
import { getDreamerWishTypeIcon } from '@entities/application/lib/getDreamerWishTypeIcon';
import { pluralizeYears, pluralizedDreamersCount } from '@shared/lib/pluralize';
import { Button, Paragraph, Tag } from '@shared/ui';
import css from './ReservedApplicationItemCard.module.scss';

export type ReservedApplicationItemCardProps = {
  reservedApplication: Application;
  onTake(id: number): void;
  onReject?(): void;
};

const MAX_INTERESETS_TO_DISPLAY = 2;

export const ReservedApplicationItemCard = (props: ReservedApplicationItemCardProps) => {
  const { onTake, reservedApplication, onReject } = props;

  const dreamersCount = reservedApplication?.dreamers?.length;
  console.log('reserved', reservedApplication);
  const renderInterests = useCallback((interests: { value: number; label: string }[]) => {
    return [...interests].splice(0, MAX_INTERESETS_TO_DISPLAY).map((item) => {
      return <Tag key={item.value} className={css.interest} title={item.label} />;
    });
  }, []);

  return (
    <div className={css.card}>
      <Space direction='vertical' size={24}>
        <header className={css.header}>
          {reservedApplication?.settlement && (
            <Typography.Title level={5} style={{ margin: 0, textAlign: 'start' }}>
              {reservedApplication?.settlement}
            </Typography.Title>
          )}
          <div className={css.dreamersCount}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {pluralizedDreamersCount(dreamersCount)}
            </Typography.Title>
          </div>
        </header>

        {dreamersCount > 0 ? (
          <Space direction='vertical' align='start' size={12} styles={{ item: { width: '100%' } }}>
            {reservedApplication?.dreamers.map((item, index) => (
              <div key={`${item?.first_name}-${index}`} className={css.dreamer}>
                <Space direction='vertical'>
                  <Space style={{ justifyContent: 'space-between' }}>
                    {item.age ? (
                      <Paragraph strong>
                        {`${item.first_name}, ${item.age} ${pluralizeYears(Number(item.age))}`}
                      </Paragraph>
                    ) : (
                      <Paragraph strong>{item.first_name}</Paragraph>
                    )}

                    <Tag className={css.dreamerCounter} title={`${index + 1}`} />
                  </Space>

                  {item.dream_category.type ? (
                    <Space
                      className={css.dreamerWish}
                      styles={{ item: { alignItems: 'center', display: 'flex' } }}
                    >
                      {getDreamerWishTypeIcon(item.dream_category?.type, { width: 16, height: 16 })}
                      <Paragraph className={css.dreamerWishLabel}>
                        {item.dream_category?.label}
                      </Paragraph>
                    </Space>
                  ) : null}
                </Space>

                {item.interest.length > 0 ? (
                  <Space direction='vertical' align='start'>
                    <Paragraph level={6} strong>
                      Интересы:
                    </Paragraph>
                    <Space direction='horizontal' wrap size={4}>
                      {renderInterests(item.interest)}
                      {item.interest.length > MAX_INTERESETS_TO_DISPLAY ? (
                        <Tag title={`+ ${item.interest.length - MAX_INTERESETS_TO_DISPLAY}`} />
                      ) : null}
                    </Space>
                  </Space>
                ) : null}
              </div>
            ))}
          </Space>
        ) : null}

        <Space direction='vertical'>
          <Button type='primary' onClick={() => onTake(reservedApplication.id)}>
            Исполнить мечты
          </Button>
          {onReject ? (
            <Button type='text' onClick={onReject}>
              Другая заявка
            </Button>
          ) : null}
        </Space>
      </Space>
    </div>
  );
};
