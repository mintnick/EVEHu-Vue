export const api = 'http://localhost:3002'
// export const api = 'https://eve-forge-api.nickning.app/'

export function getThumbnail(server, type, id) {
  const url = getImageUrl(server, type, id);

  return {
    backgroundImage:
      `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
}

export function getId(type, item) {
  if (type == "alliance") return item.alliance_id;
  else if (type == "corporation") return item.corporation_id;
}

export function getHistoryThumbnail(
  server,
  alliance_id,
  corporation_id,
  alliance_name = null,
  corporation_name = null,
) {
  const alliance_thumbnail = !alliance_name
    ? getImageUrl(server, "alliance", alliance_id)
    : "";
  const corporation_thumbnail = !corporation_name
    ? getImageUrl(server, "corporation", corporation_id)
    : "";

  return {
    backgroundImage:
      `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${corporation_thumbnail}), url(${alliance_thumbnail})`,
    backgroundRepeat: "no-repeat, no-repeat, no-repeat",
    backgroundPosition: "center, left, right",
  };
}

export function formatDate(server, date_string, full) {
  if (server == "sr") {
    const date = new Date(date_string);
    if (!full) return date.toLocaleString("zh").slice(0, -9);
    return date.toLocaleString("zh").slice(0, -3);
  }
}

export function getImageUrl(server, type, id) {
  if (!id) {
    return "";
  }
  if (server == "sr") {
    return "https://image.evepc.163.com/" +
      (type == "alliance" ? "Alliance" : "Corporation") + "/" + id + "_128.png";
  } else if (server == "tq") {
    return "https://images.evetech.net/" + type + "s/" + id + "/logo?size=128";
  }
}