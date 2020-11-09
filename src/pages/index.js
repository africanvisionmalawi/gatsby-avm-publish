import React, { useState, useEffect } from "react"
import { styled } from "linaria/react"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"

import Layout from "../components/layout"
import SEO from "../components/seo"

dayjs.extend(advancedFormat)



const IndexPage = () => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [lastUpdated, setLastUpdated] = useState("")
  const [imageRefresh, setImageRefresh] = useState("")  

  const btnText = "Publish site"
  const btnTextUpdating = "Site updating"

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisableBtn(false)
    }, 30000)
  },[disableBtn])

  const handleSubmit = e => {
    e.preventDefault()
    setDisableBtn(true)
    setImageRefresh("Loading...")
    const url = process.env.GATSBY_API_URL
    const options = {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + process.env.GATSBY_GITHUB_TOKEN,
      },
      body: JSON.stringify({
        event_type: process.env.GATSBY_EVENT_TYPE,
      }),
    }
    fetch(url, options)
      .then(res => res.json())
      .catch(error => console.log(error))
  }

  const handleClick = e => {
    setImageRefresh("Loading again...")
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
      <p>This button will show the current state of the latest build, click on it to refresh the button and show the latest state.</p>
      <BuildBtn><img src="https://api.netlify.com/api/v1/badges/f667e17e-f666-46bf-b25f-216f8720eea2/deploy-status" alt={imageRefresh} onClick={e => handleClick(e)} /></BuildBtn>
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

const BuildBtn = styled.span`
  cursor: pointer;
  display: block;
`

export default IndexPage
