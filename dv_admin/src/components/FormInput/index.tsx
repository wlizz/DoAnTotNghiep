import { Form, Input } from 'antd'
type Props = {
  label?: string,
  name?: string,
  required?: boolean,
  message?: string,
  pattern?: any,
  value?: string | number,
  defaultValue?: string | number,
  disabled?: boolean,
}
export default function index(props: Props) {
  const { label, name, required, message, pattern, value, defaultValue, disabled } = props
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: message
        },
        {
          pattern: pattern,
          message: "Định dạng không đúng"
        }
      ]}
    >
      <Input
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </Form.Item>
  )
}
