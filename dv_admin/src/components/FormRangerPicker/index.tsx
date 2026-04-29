import { DatePicker, Form } from 'antd'
const { RangePicker } = DatePicker;
type Props = {
  label?: string,
  name?: string,
  style?: any
}
export default function index(props: Props) {
  const { label, name, style } = props
  return (
    <Form.Item label={label} name={name}>
      <RangePicker style={style} />
    </Form.Item>
  )
}
