export const checkStatus = (status: number) => {
  let statusType = {
    color: '',
    name: ""
  }
  switch (status) {
    case 0:
      statusType = {
        name: 'Đã hủy',
        color: 'red'
      }
      break;
    case 1:
      statusType = {
        name: 'Đã duyệt',
        color: 'green'
      }
      break;
    case 2:
      statusType = {
        name: 'Chờ duyệt',
        color: 'orange'
      }
      break;
    default: break;
  }
  return statusType
}