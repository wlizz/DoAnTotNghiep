import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import FooterLayout from '../../components/Footer'
import HeaderLayout from '../../components/Header'

export default function Main() {
  return (
    <div>
      <Layout >
        <Header style={{ backgroundColor: '#8eae0f', position: 'sticky', top: 0, zIndex: 1000, width: '100%', padding: '0px' }} >
          <HeaderLayout></HeaderLayout>
        </Header>
        <Content style={{width: '90%', margin: '5px auto'}}>
          <Outlet></Outlet>
        </Content>
        <Footer style={{ backgroundColor: '#282828', position: 'sticky', top: 0, zIndex: 1000, width: '100%', padding: '0px' }}>
          <FooterLayout/>
        </Footer>
      </Layout>
    </div>
  )
}
