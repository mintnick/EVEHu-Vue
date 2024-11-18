export default function getThumbnail (type, id) {
  const url = "https://image.evepc.163.com/" + (type == 'alliance' ? 'Alliance' : 'Corporation') + '/' + id + '_128.png'
  
  return {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}