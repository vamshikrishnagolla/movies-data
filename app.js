const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const databasepath = path.join(__dirname, 'moviesData.db')
const app = express()
app.use(express.json())

const database = null

const initializeDbAndServer = async () => {
  try {
    database = open({
      filename: databasepath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`DB error : ${error.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

const convertDBObjectToResponseObject = DBobject => {
  return {
    moviename: DBobject.movie_name,
  }
}

app.get('/movies/', async (request, response) => {
  const getmoviesquery = `
    SELECT
     *
    FROM
    movie`
  const moviesarray = await database.all(getmoviesquery)
  response.send(convertDBObjectToResponseObject(moviesarray))
})

