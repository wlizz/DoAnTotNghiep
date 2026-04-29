import { FreeMode, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react"
import { BRANCH_1, BRANCH_2, BRANCH_3, BRANCH_4, BRANCH_5, BRANCH_6 } from '../../assets'
export default function ListBranch() {

  const LIST_BRANCH = [
    { name: '', src: BRANCH_5 },
    { name: '', src: BRANCH_3 },
    { name: '', src: BRANCH_1 },
    { name: '', src: BRANCH_4 },
    { name: '', src: BRANCH_2 },
    { name: '', src: BRANCH_6 },
  ]
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
      style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
    >
      {LIST_BRANCH.map((item, index) => {
        return <SwiperSlide key={index}>
          <img src={item.src} style={{ width: '100%', height: '100px', borderRadius: '10px' }} alt='' />
          <h5>{item.name}</h5>
        </SwiperSlide>
      })}
    </Swiper>
  )
}
