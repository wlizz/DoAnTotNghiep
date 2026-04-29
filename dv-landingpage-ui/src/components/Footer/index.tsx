import { Col, Row } from 'antd'
import { ReactNode } from 'react'
import { HomeFilled, PhoneFilled, MailFilled, AntDesignOutlined } from '@ant-design/icons'
import './footer.scss'
export default function FooterLayout() {
  const _renderItemInfo = (icon: ReactNode, title: string) => {
    return (
      <div className='info-item'>
        <span>{icon}</span>
        <p>{title}</p>
      </div>
    )
  }

  const LIST_BRANCH = ['BANDAI', 'KOBOBUYA', 'TTHONGLI', 'DABAN', 'FATCAT', 'HYZAK']
  return (
    <>
      <Row className='footer-container'>
        <Col xs={24} md={12} lg={7}>
          <h5>Gundam & Figure</h5>
          <hr />
          {_renderItemInfo(<HomeFilled />, 'Địa chỉ: Giao Tân-Giao Bình-Nam Định')}
          {_renderItemInfo(<MailFilled />, 'Email: nguyenbadaon113@gmail.com')}
          {_renderItemInfo(<PhoneFilled />, 'Số điện thoại: 0384167340')}
        </Col>
        <Col xs={24} md={12} lg={6}>
          <h5>HÃNG SẢN PHẨM</h5>
          <hr />
          <Row>
            {LIST_BRANCH.map((item, index) => {
              return <Col xs={12} key={index}><AntDesignOutlined style={{ margin: '5px' }} />{item}</Col>
            })}
          </Row>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <h5>BẢN ĐỒ</h5>
          <hr />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12591.413189503808!2d106.38683033086413!3d20.240182852093138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136068a6d65173b%3A0x6bf52a22ba03bdf9!2zVHLGsOG7nW5nIFRIUFQgR2lhbyBUaOG7p3kgQg!5e0!3m2!1svi!2s!4v1775361368787!5m2!1svi!2s"
            width="100%"
            height="250"
            style={{border:'0'}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </Col>
      </Row>
      <div className='footer-copyright'>
        @Copyright by  GunDam&Figure
      </div>
    </>
  )
}
