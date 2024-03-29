const faunadb = require("faunadb")
/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNADB_SECRET,
})
export { q, client }
