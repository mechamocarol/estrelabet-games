import axios from "axios"

const API_URL = 'https://mmo-games.p.rapidapi.com/'
const headers = {
  'X-RapidAPI-Key': '7f452d2cc2msh064572dbfba5055p15ee13jsn702ea0efcee9',
  'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
}

export const gamesService = {
  getGamesList,
  getGameById
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
    `${API_URL}games/${id}`,
    {
      headers
    }
  )
}
