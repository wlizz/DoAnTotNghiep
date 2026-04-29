import { PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function ButtonAdd() {
  return (
    <Button className='button'>
      <PlusCircleOutlined />
      Thêm mới
    </Button>
  )
}
