import { Input, Modal, notification } from 'antd'
import { useEffect, useState } from 'react'
import api from '../../../api';
type Props = {
  handleOk: () => void;
  closeModal: () => void;
  confirmLoading: boolean
}
export default function ModalAddCategory(props: Props) {
  const { handleOk, closeModal, confirmLoading } = props
  const [categoryName, setCategoryName] = useState('')
  const onchangeName = (e: any) => {
    setCategoryName(e.target.value)
  }

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.keyCode === 13) {
        addCategory()
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [categoryName]);

  const addCategory = async () => {
    try {
      if (!categoryName) {
        notification.warning({
          message: 'Thông báo',
          description: 'Chưa có tên danh mục!',
        })
        return;
      }
      await api.category.createCategory(categoryName)
      notification.success({
        message: 'Thông báo',
        description: 'Tạo danh mục mới thành công!'
      })
      closeModal()
      handleOk()
    } catch (err: any) {
      if (err.response.data.message && err.response.data.message === 'Tên danh mục đã tồn tại!') {
        notification.error({
          message: 'Thông báo',
          description: 'Tên danh mục đã tồn tại!'
        })
        return
      }
      notification.error({
        message: 'Thông báo',
        description: 'Tạo danh mục mơi thất bại!'
      })
    }
  }
  return (
    <Modal
      title="Thêm danh mục mới"
      open={true}
      onOk={addCategory}
      confirmLoading={confirmLoading}
      onCancel={closeModal}
    >
      <p>Nhập tên danh mục:</p>
      <Input value={categoryName} onChange={onchangeName} />
    </Modal>
  )
}