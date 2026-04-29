import { Menu, MenuProps } from 'antd'
import { GoldOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '../../api';
import { CategoryResponse } from '../../dataType/category';
import { useNavigate } from 'react-router-dom';

export default function ListCategory() {
  const [listCategory, setListCategory] = useState<CategoryResponse[]>([])
  const natigate = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    natigate(`/category/${e.key}`,)
  };

  useEffect(() => {
    getAllCategory()
  }, [])

  const getAllCategory = async () => {
    try {
      const res = await api.category.getAllCategory()
      setListCategory(res.data.filter((item: CategoryResponse) => item.active_flg !== 0))
    } catch (err) { }
  }

  const menu: MenuProps['items'] = listCategory.map((item: CategoryResponse) => {
    return {
      label: item.name,
      key: item.id,
      icon: <GoldOutlined />
    }
  })
  return (
    <Menu
      onClick={onClick}
      style={{ width: '100%', height: '100%' }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={menu}
    />
  )
}
