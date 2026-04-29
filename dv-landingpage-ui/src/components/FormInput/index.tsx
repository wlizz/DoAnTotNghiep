import React, { PureComponent } from "react";
import { Form, Input } from "antd";
type Props = {
  form: any;
  title1: string;
  label: string;
  required: boolean;
  pattern?: any;
  type?: string;
  value?: string | number;
  placeholder: string;
  row: boolean;
  validateStatus?: boolean;
  onChangeValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: any;
  disabledInput?: boolean;
  typeInput?: string
};
type State = {};
class FormInput extends PureComponent<Props, State> {
  static defaultProps = {
    validateStatus: true,
    required: false,
    hasFeedback: true,
    message: "Giá trị không phù hợp "
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { sm: 24, md: 24, lg: 10, xl: 8 },
      wrapperCol: { sm: 24, md: 24, lg: 14, xl: 16 }
    };
    const {
      title1,
      label,
      required,
      pattern,
      type,
      value,
      placeholder,
      row,
      onChangeValue,
      style,
      disabledInput,
      typeInput
    } = this.props;
    return (
      <Form.Item
        style={style}
        label={title1}
        hasFeedback
        colon={false}
        {...(row && formItemLayout)}
      >
        {getFieldDecorator(label, {
          validateTrigger: "onBlur",
          rules: [
            {
              required: required,
              message: "Vui lòng nhập thông tin",
              whitespace: true
            },
            {
              pattern: pattern,
              message: "Định dạng không đúng"
            },
            {
              type: type,
              message: "Định dạng không đúng!"
            }
          ],
          initialValue: value
        })(
          <Input
            type={typeInput}
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={onChangeValue}
            disabled={disabledInput}
          />
        )}
      </Form.Item>
    );
  }
}
export default FormInput;
