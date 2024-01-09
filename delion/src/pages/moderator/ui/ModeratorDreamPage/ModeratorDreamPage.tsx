import React, { useCallback, useMemo, useState } from 'react';
import { Col, Row, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ModeratorDreamFinalize } from '@pages/moderator/ui/ModeratorDreamPage/ui/ModeratorDreamFinalize';
import { ModeratorDreamForm } from '@pages/moderator/ui/ModeratorDreamPage/ui/ModeratorDreamForm';
import { ModeratorMenuAnchor } from '@widgets/moderator';
import css from './ModeratorDreamPage.module.scss';

export const ModeratorDreamPage = () => {
  const [form] = useForm();
  const [step, setStep] = useState<'submit' | 'finalize'>('submit');
  const [loading, setLoading] = useState(true);

  const prevStep = useCallback(() => {
    setLoading(true);
    setStep('submit');
  }, []);

  const content = useMemo(() => {
    if (step == 'finalize')
      return <ModeratorDreamFinalize setLoading={setLoading} prevStep={prevStep} />;
    else
      return (
        <ModeratorDreamForm
          nextStep={() => setStep('finalize')}
          setLoading={setLoading}
          form={form}
        />
      );
  }, [step]);

  return (
    <Spin spinning={loading}>
      <Row className={css.container} gutter={[24, 0]}>
        <Col md={5} span={24}>
          <ModeratorMenuAnchor form={form} />
        </Col>
        <Col md={19} span={24}>
          {content}
        </Col>
      </Row>
    </Spin>
  );
};
