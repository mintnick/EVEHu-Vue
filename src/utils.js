export function getThumbnail(server, type, id) {
  let url
  
  if (server == "sr") url = "https://image.evepc.163.com/" + (type == 'alliance' ? 'Alliance' : 'Corporation') + '/' + id + '_128.png'
  else if (server == "tq") url = "https://images.evetech.net/" + type + 's/' + id + '/logo?size=128'
  
  return {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}

export function getId(type, item) {
  if (type == "alliance") return item.alliance_id
  else if (type == "corporation") return item.corporation_id
}