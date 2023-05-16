import axios from "axios"

const API_URL = 'https://mmo-games.p.rapidapi.com/'
const headers = {
  'X-RapidAPI-Key': '7f452d2cc2msh064572dbfba5055p15ee13jsn702ea0efcee9',
  'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
}

export const gamesService = {
  getGamesList,
  getGameById,
  getGamesByCategoryOrPlatform
}

async function getGamesList () {
  return axios.get(
    `${API_URL}games`,
    {
      headers
    }
  )
}

async function getGameById (id) {
  return axios.get(
    `${API_URL}game?id=${id}`,
    {
      headers
    }
  )
}

async function getGamesByCategoryOrPlatform (category, platform) {
  let url = `${API_URL}games?`
  if (platform) {
    url += `platform=${platform}&`
  }
  if (category) {
    url += `category=${category}&`
  }
 
  return axios.get(
    url, { headers }
  )
}
