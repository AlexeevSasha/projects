import { Form, type InputNumberProps } from 'antd';
import { InputNumber } from '@shared/ui';
import css from './MinMaxNumberInput.module.scss';

type TProps = {
  label?: string;
  minInput: InputNumberProps;
  maxInput: InputNumberProps;
};

export const MinMaxNumberInput = (props: TProps) => {
  const { minInput, maxInput, label } = props;

  const renderInputs = () => {
    return (
      <div className={css.prices}>
        <InputNumber placeholder={minInput.placeholder || 'от'} {...minInput} />
        <span className={css.prices__delimiter} />
        <InputNumber placeholder={minInput.placeholder || 'до'} {...maxInput} />
      </div>
    );
  };

  if (label) {
    return <Form.Item label={label}>{renderInputs()}</Form.Item>;
  }

  return renderInputs();
};
