import React, { useState, useEffect } from "react"
// import { Link } from "gatsby"
import axios from "axios"
import { styled } from "linaria/react"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { client, q } from "../../fauna/db"
// var faunadb = require("faunadb"),
//   q = faunadb.query
// var client = new faunadb.Client({ secret: process.env.GATSBY_FAUNADB_SECRET })
console.log("cilent is ", client)
// getAllComments: async () => {
//    const results = await client.query(
//      q.Paginate(q.Match(q.Index("get-all-comments")))
//    );
//    console.log(JSON.stringify(results, null, 2));
//    return results.data.map(([ref, isApproved, slug, date, name, comment]) => ({
//      commentId: ref.id,
//      isApproved,
//      slug,
//      date,
//      name,
//      comment,
//    }));
//  },

const getAllProducts = client
  .query(q.Paginate(q.Match(q.Ref("indexes/sites"))))
  .then(response => {
    const productRefs = response.data
    // create new query out of todo refs.
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllProductDataQuery = productRefs.map(ref => {
      return q.Get(ref)
    })
    // query the refs
    return client.query(getAllProductDataQuery).then(data => data)
  })
  .catch(error => console.log("error", error.message))

const IndexPage = () => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [data, setData] = useState("")

  const btnText = "Publish site"
  const btnTextUpdating = "Site updating"

  useEffect(() => {
    getAllProducts.then(data => setData(data))
  }, [])
  // const getData2 = () =>
  //   client.query(q.Identity()).then(ret => console.log(ret))

  const handleSubmit = e => {
    e.preventDefault()
    console.log("here")
    setDisableBtn(true)
    // axios
    //   .post("https://api.netlify.com/build_hooks/5ec6d7e8ce81309f11610c29")
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
  }
  return (
    <Layout>
      <SEO title="Home" />
      <h1>AVM publish page</h1>
      <h2>Click the button below to start a build of the site</h2>
      {disableBtn ? (
        <Btn className="disabled">{btnTextUpdating}</Btn>
      ) : (
        <Btn onClick={e => handleSubmit(e)}>{btnText}</Btn>
      )}
      <p>
        This should take upto 5 mins to complete, but shouldn't be no more than
        3 mins.
      </p>
      <pre>{JSON.stringify(data, null, 1)}</pre>
      <h2>The image below shows the current status of the site/build</h2>
      <img
        src="https://api.netlify.com/api/v1/badges/f667e17e-f666-46bf-b25f-216f8720eea2/deploy-status?trigger_title=triggered+by+Admin"
        alt="build status"
      />
      {/* {getData} */}
    </Layout>
  )
}

const Btn = styled.button`
  appearance: none;
  border: 1px solid #007a70;
  border-radius: 6px;
  color: #007a70;
  cursor: pointer;
  display: block;
  font-weight: bold;
  margin: 1rem 0;
  padding: 12px;
  text-align: center;
  width: 200px;
  &.disabled {
    border-color: #7a7d82;
    color: #7a7d82;
    cursor: default;
  }
`

export default IndexPage
