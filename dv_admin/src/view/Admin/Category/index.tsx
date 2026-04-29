import { useEffect, useState } from 'react';
import './category.scss';
import { Button, Input } from 'antd';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ModalAddCategory from './ModalAddCategory';
import { CategoryResponse } from '../../../dataType/category';
import api from '../../../api';
import TableListCategory from './TableListCategory';

function Category() {
  const [categoryName, setCategoryName] = useState('')
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [listCategory, setListCategory] = useState<CategoryResponse[]>([])

  useEffect(() => {
    getAllCategory()
  }, [])

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.keyCode === 13) {
        getAllCategory()
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [categoryName]);

  const getAllCategory = async () => {
    setLoading(true)
    try {
      const res = await api.category.getAllCategory()
      const listCate = res.data.filter((item: CategoryResponse) => item.name.toLowerCase().includes(categoryName.toLowerCase()))
      setListCategory(listCate)
    } catch (err) { }
    finally {
      setLoading(false)
    }
  }

  const onChange = (e: any) => {
    setCategoryName(e.target.value)
  }

  const handleOk = () => {
    getAllCategory()
  }

  const _renderHeaderCategory = () => {
    return (
      <div className='header-container'>
        <h5>Danh mục sản phẩm</h5>
        <Button
          onClick={() => setShowModalAdd(true)}
          size='large'
          type='primary'
          className='button-add'
        >
          <PlusCircleOutlined />
          Thêm
        </Button>
      </div>
    )
  }
  return (
    <>
      <div className='category-container'>
        {_renderHeaderCategory()}
        <div style={{ margin: 1 }}>
          <TableListCategory
            listCate={listCategory}
            getListCategory={getAllCategory}
            loadingTable={loading}
          />
        </div>
        {showModalAdd &&
          <ModalAddCategory
            closeModal={() => setShowModalAdd(false)}
            handleOk={handleOk}
            confirmLoading={loading}
          />
        }
      </div>
    </>
  );
}

export default Category;
