import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Col, Drawer, Flex, Form, Grid, Modal, Row, Space, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import type { FieldData, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { type Application, FormBlock } from '@entities/application';
import { ApplicationStatus, type ModerationError } from '@entities/application/model/application';
import { ModerationErrorsBlock } from '@entities/application/ui/ModerationErrorsBlock/ModerationErrorsBlock';
import type { DreamerSection } from '@entities/dreamer';
import { type Dreamer, dreamerSectionList } from '@entities/dreamer';
import { NextStepBlock, SaveDraft, SendApplication } from '@features/application/trustee';
import type { RequestResult } from '@shared/api';
import { newRegionIds } from '@shared/const/newRegionIds';
import { isObjectEmpty, messageError, objectKeys, scrollToElementId, useStores } from '@shared/lib';
import { Collapse, FloatingButton, StatusHint } from '@shared/ui';
import {
  ApplicationHeader,
  ApplicationSteps,
  ContactsBlock,
  DreamerAbout,
  DreamerCategory,
  DreamerGoodDeed,
  DreamerInfo,
  DreamerWishes,
} from '@widgets/application';
import type { ApplicationBlocks } from '../model/types';
import css from './DraftPage.module.scss';

export const DraftPage = observer(() => {
  const [form] = useForm();
  const [moderationErrors, setModerationErrors] = useState<ModerationError[]>([]);
  const { trusteeS, applicationS, userS } = useStores();
  const [section, setSection] = useState<keyof typeof blocks>('contacts');
  const [openDrawer, setOpenDrawer] = useState(false);
  const breakpoint = Grid.useBreakpoint();
  const [modal, modalContext] = Modal.useModal();

  const selectSection = useCallback(
    (newSection: keyof typeof blocks) => {
      const { selectedDreamer, application } = applicationS;

      if (!selectedDreamer) return setSection(newSection);

      if (section === 'is_dream' && newSection === 'is_dream') {
        const currentDreamerEmptySection = dreamerSectionList.find((item) => {
          return !selectedDreamer[item];
        });

        if (currentDreamerEmptySection) return setSection(currentDreamerEmptySection);

        const hasNext = !application.dreamers.every((dreamer, index) => {
          if (dreamer.id !== selectedDreamer.id || !application.dreamers[index + 1]) return true;

          const newDreamer = application.dreamers[index + 1];
          applicationS.setSelectedDreamer(newDreamer);

          const newDreamerEmptySection = dreamerSectionList.find((item) => {
            return !newDreamer[item];
          });

          setSection(newDreamerEmptySection || 'is_dreamer_info');
          return false;
        });

        if (!hasNext) {
          application.dreamers.every((dreamer) => {
            const newDreamerEmptySection = dreamerSectionList.find((item) => {
              return !dreamer[item];
            });

            if (!newDreamerEmptySection) return true;

            applicationS.setSelectedDreamer(dreamer);
            setSection(newDreamerEmptySection || 'is_dreamer_info');
          });
        }

        return;
      }

      setSection(newSection);
    },
    [applicationS.application, applicationS.selectedDreamer?.id, section],
  );

  const handleAction = useCallback(
    async (
      callback: () => Promise<RequestResult<Application | Dreamer | undefined> | undefined>,
    ) => {
      if (isObjectEmpty(form.getFieldsValue())) {
        return Promise.resolve();
      }

      try {
        await form.validateFields();
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          error.hasOwnProperty('errorFields') &&
          (error as ValidateErrorEntity).errorFields.length
        ) {
          console.log(error);

          scrollToElementId((error as ValidateErrorEntity).errorFields[0].name[0].toString());
          return Promise.reject();
        }
      }

      const result = await callback();

      if (!result) {
        return Promise.resolve();
      }

      const { errorData, status, statusCode } = result;

      if (!errorData || status) {
        return Promise.resolve();
      }

      const mergeErrors: FieldData[] = errorData.extra.map(({ name, errors }) => {
        return {
          errors,
          name,
        };
      });

      form.setFields(mergeErrors);

      if (mergeErrors.length) {
        scrollToElementId(mergeErrors[0].name);
      }

      return Promise.reject({ statusCode, status });
    },
    [form],
  );

  const handleValuesChange = (values: object) => {
    console.log(values);

    Object.keys(values).forEach((field) => {
      const error = form.getFieldError(field);
      if (!error.length) {
        return;
      }
      // Clear error message of field
      form.setFields([
        {
          name: field,
          errors: [],
        },
      ]);
    });
  };

  const handleAddDreamer = () =>
    handleAction(() => blocks[section].action()).then(() => {
      trusteeS.createDreamer().then((res) => {
        applicationS.setSelectedDreamer(res);
        setSection('is_dreamer_info');
        form.setFieldsValue(res);
      });
    });

  const handleChangeContacts = async () => {
    try {
      const regionId = form.getFieldValue('settlement')?.data?.region_kladr_id;
      const isSelectedRegionNew = newRegionIds.includes(regionId);
      const isCurrentRegionNew = applicationS.application.is_new_region;

      let willChangeData = true;
      let needShowMessage = false;

      if (
        isSelectedRegionNew !== isCurrentRegionNew &&
        isCurrentRegionNew !== null &&
        regionId !== undefined
      ) {
        willChangeData = await modal.confirm({
          title: 'Сбросить категорию',
          content:
            'Вы указали другой регион, категория мечтателя будет сброшена. Вы уверены что хотите сохранить изменения?',
          okText: 'Сбросить категорию',
          cancelText: 'Отменить',
          width: 400,
        });

        needShowMessage = true;
      }

      if (willChangeData) {
        return trusteeS.updateContacts(form.getFieldsValue(), needShowMessage);
      } else {
        form.resetFields();
        messageError('Ваши контактные данные НЕ изменены');
      }
    } catch (error) {}
  };

  const blocks: ApplicationBlocks = {
    contacts: {
      step: 1,
      block: (
        <ContactsBlock
          form={form}
          nextBlock={
            <NextStepBlock
              form={form}
              onClick={() => {
                if (applicationS.application.status === ApplicationStatus.NEED_REVISION) {
                  applicationS.setSelectedDreamer(applicationS.application.dreamers[0]);
                  selectSection('is_dreamer_info');
                  return;
                }
                handleAction(() => {
                  return handleChangeContacts();
                })
                  .then(() => {
                    if (!applicationS.application.is_contact_filled) {
                      return Promise.reject('Заполните контакты');
                    }

                    if (applicationS.application.dreamers.length) {
                      applicationS.setSelectedDreamer(applicationS.application.dreamers[0]);
                      return Promise.resolve();
                    }

                    trusteeS.createDreamer().then((res) => {
                      applicationS.setSelectedDreamer(res);
                    });
                  })
                  .then(() => {
                    selectSection('is_dreamer_info');
                  });
              }}
              onAddDreamer={handleAddDreamer}
            />
          }
        />
      ),
      onNext: () => {
        if (applicationS.application.status === ApplicationStatus.NEED_REVISION) {
          applicationS.setSelectedDreamer(applicationS.application.dreamers[0]);
          selectSection('is_dreamer_info');
          return;
        }
        handleAction(() => {
          return handleChangeContacts();
        })
          .then(() => {
            if (!applicationS.application.is_contact_filled) {
              return Promise.reject('Заполните контакты');
            }

            if (applicationS.application.dreamers.length) {
              applicationS.setSelectedDreamer(applicationS.application.dreamers[0]);
              return Promise.resolve();
            }

            trusteeS.createDreamer().then((res) => {
              applicationS.setSelectedDreamer(res);
            });
          })
          .then(() => {
            selectSection('is_dreamer_info');
          });
      },
      action: () => {
        if (applicationS.application.status === ApplicationStatus.NEED_REVISION) {
          return Promise.resolve(undefined);
        }
        return handleChangeContacts();
      },
      label: 'Контакты',
    },
    is_dreamer_info: {
      step: 2,
      block: (
        <DreamerAbout
          errors={moderationErrors.find(
            (error) => error.dreamer_id === applicationS.selectedDreamer?.id,
          )}
          form={form}
        />
      ),
      onNext: () => {
        handleAction(() => trusteeS.updateDreamerAbout(form.getFieldsValue())).then(() =>
          selectSection('is_dreamer_category'),
        );
      },
      action: () => trusteeS.updateDreamerAbout(form.getFieldsValue()),
      label: 'Информация о мечтателе',
    },
    is_dreamer_category: {
      step: 3,
      block: (
        <DreamerCategory
          errors={moderationErrors.find(
            (error) => error.dreamer_id === applicationS.selectedDreamer?.id,
          )}
          form={form}
        />
      ),
      onNext: () =>
        handleAction(() => trusteeS.updateDreamerCategory(form.getFieldsValue())).then(() =>
          selectSection('is_additional_info'),
        ),
      action: () => trusteeS.updateDreamerCategory(form.getFieldsValue()),
      label: 'Категория мечтателя',
    },
    is_additional_info: {
      step: 4,
      block: <DreamerInfo />,
      action: () => trusteeS.updateDreamerInfo(form.getFieldsValue()),
      onNext: () => {
        handleAction(() => trusteeS.updateDreamerInfo(form.getFieldsValue())).then(() =>
          selectSection('is_good_deed'),
        );
      },
      label: 'Доп. информация',
    },
    is_good_deed: {
      step: 5,
      block: <DreamerGoodDeed form={form} />,
      action: () => trusteeS.updateDreamerGoodDeed(form.getFieldsValue()),
      onNext: () => {
        handleAction(() => trusteeS.updateDreamerGoodDeed(form.getFieldsValue())).then(() =>
          selectSection('is_dream'),
        );
      },
      label: 'Доброе дело',
    },
    is_dream: {
      block: (
        <>
          <DreamerWishes
            errors={moderationErrors.find(
              (error) => error.dreamer_id === applicationS.selectedDreamer?.id,
            )}
            form={form}
            nextBlock={
              <NextStepBlock
                form={form}
                onClick={() =>
                  handleAction(() => trusteeS.updateDreamerWish(form.getFieldsValue())).then(() =>
                    selectSection('is_dream'),
                  )
                }
                onAddDreamer={handleAddDreamer}
              />
            }
          />
        </>
      ),
      action: () => trusteeS.updateDreamerWish(form.getFieldsValue()),
      onNext: () => {
        handleAction(() => trusteeS.updateDreamerWish(form.getFieldsValue())).then(() =>
          selectSection('is_dream'),
        );
      },
      label: 'Желание мечтателя',
    },
  };

  useEffect(() => {
    const applicationId = userS.user?.dream_application_id;
    if (!applicationId) {
      return;
    }

    trusteeS
      .getApplication(applicationId)
      .then((res) => {
        if (!res) {
          return;
        }

        form.setFieldsValue(res);
      })
      .then(() => {
        if (trusteeS.applicationS.application.status === ApplicationStatus.NEED_REVISION) {
          trusteeS.getModerationResult().then((res) => setModerationErrors(res));
        }
      });
  }, [userS.user]);

  useEffect(() => {
    if (applicationS.selectedDreamer === undefined) setSection('contacts');
    form.setFieldsValue(applicationS.selectedDreamer);
  }, [applicationS.selectedDreamer?.id, section]);
  1;

  const handleSectionChange = useCallback(
    (newSection: keyof typeof blocks) =>
      handleAction(() => blocks[section].action())
        .then(() => {
          setSection(newSection);
          if (newSection === 'contacts') {
            applicationS.setSelectedDreamer(undefined);
          }
        })
        .finally(() => setOpenDrawer(false)),
    [applicationS, handleAction, section],
  );

  const handleDreamerChange = useCallback(
    (dreamer: Dreamer) => {
      if (applicationS.selectedDreamer?.id === dreamer.id) return;

      return handleAction(() => blocks[section].action())
        .then(() => applicationS.setSelectedDreamer(dreamer))
        .then(() => {
          form.setFieldsValue(applicationS.selectedDreamer);
        });
    },
    [applicationS.selectedDreamer?.id, section],
  );

  const ApplicationMenu = useMemo(() => {
    return (
      <ApplicationSteps
        section={section}
        errors={moderationErrors}
        contact_status={applicationS.application.is_contact_filled ? 'success' : 'default'}
        onDreamerAdd={handleAddDreamer}
        onSectionClick={handleSectionChange}
        onDreamerClick={handleDreamerChange}
      />
    );
  }, [applicationS, handleAction, handleAddDreamer, moderationErrors, section]);

  const sectionItems = useMemo<CollapseProps['items']>(() => {
    const { selectedDreamer } = applicationS;

    if (!selectedDreamer) return [];

    return objectKeys(blocks)
      .filter((block) => block !== 'contacts')
      .map((block) => {
        const label = (
          <Flex
            gap={8}
            align={'baseline'}
            onClick={() => {
              handleSectionChange(block).then(() => {
                setSection(block);
              });
            }}
            style={{ cursor: 'pointer' }}
          >
            {!!selectedDreamer[block as DreamerSection] && (
              <CheckCircleFilled className={css.icon} />
            )}
            <Typography.Title level={5}>{blocks[block].label}</Typography.Title>
          </Flex>
        );

        return {
          key: block,
          label: section === block ? undefined : label,
          children: (
            <>
              {blocks[block].block}
              <FormBlock>
                <NextStepBlock
                  form={form}
                  onClick={blocks[section].onNext}
                  onAddDreamer={handleAddDreamer}
                  step={blocks[section].step}
                  hidden={blocks[section].isNextHidden}
                />
              </FormBlock>
            </>
          ),
          id: `section_${block}`,
          headerClass: section === block ? css.hidden : '',
        };
      });
  }, [applicationS.selectedDreamer?.id, applicationS.isFullFilled, section]);

  return (
    <Row
      gutter={24}
      wrap={false}
      style={{ marginBottom: '24px', marginTop: breakpoint.md ? '0' : '24px' }}
    >
      {breakpoint.md ? (
        <Col span={6}>{ApplicationMenu}</Col>
      ) : (
        <>
          <FloatingButton onClick={() => setOpenDrawer(true)} />
          <Drawer
            placement='left'
            title={<ApplicationHeader />}
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
          >
            <Flex vertical justify='space-between' gap={12} style={{ height: '100%' }}>
              {ApplicationMenu}
              <Flex vertical gap={12} style={{ paddingBottom: '24px' }}>
                <SaveDraft key={section} saveEvent={blocks[section].action} form={form} />
                <SendApplication key={'send_application'} />
              </Flex>
            </Flex>
          </Drawer>
        </>
      )}
      <Col flex={'auto'}>
        <Flex gap={24} vertical>
          {breakpoint.md ? (
            <ApplicationHeader
              tools={
                <>
                  <SaveDraft key={section} saveEvent={blocks[section].action} form={form} />
                  <SendApplication key={'send_application'} />
                </>
              }
            />
          ) : (
            <StatusHint
              status={'warning'}
              text={
                'Подавать заявку проще с компьютера, а отслеживать ее статус можно и с телефона!'
              }
            />
          )}
          <Flex vertical gap={24} className={css.formContainer}>
            <Form
              onValuesChange={handleValuesChange}
              form={form}
              layout='vertical'
              initialValues={applicationS.application}
              disabled={applicationS.selectedDreamer?.is_approved_moderation}
            >
              <Space size={24} direction='vertical'>
                {applicationS.application.status === ApplicationStatus.NEED_REVISION &&
                  !!moderationErrors.length && <ModerationErrorsBlock errors={moderationErrors} />}
                {breakpoint.md || section === 'contacts' ? (
                  blocks[section].block
                ) : (
                  <Collapse
                    accordion
                    activeKey={section}
                    onChange={(key) => {
                      if (Array.isArray(key) && key.length) {
                        handleSectionChange(key[0] as keyof typeof blocks).then(() => {
                          setSection(key[0] as DreamerSection);
                          scrollToElementId(key[0], false);
                        });
                      }
                    }}
                    items={sectionItems}
                    destroyInactivePanel
                  />
                )}
              </Space>
            </Form>
            {breakpoint.md && !['is_dream', 'contacts'].includes(section) && (
              <FormBlock>
                <NextStepBlock
                  form={form}
                  onClick={blocks[section].onNext}
                  onAddDreamer={handleAddDreamer}
                  step={blocks[section].step}
                  hidden={blocks[section].isNextHidden}
                />
              </FormBlock>
            )}
          </Flex>
        </Flex>
      </Col>
      {modalContext}
    </Row>
  );
});
