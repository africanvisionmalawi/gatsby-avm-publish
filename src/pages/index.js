import React, { useState } from "react"
// import { Link } from "gatsby"
import axios from "axios"
import { styled } from "linaria/react"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [disableBtn, setDisableBtn] = useState(false)
  const btnText = "Publish site"
  const btnTextUpdating = "Site updating"
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
      <h2>The image below shows the current status of the site/build</h2>
      <img
        src="https://api.netlify.com/api/v1/badges/f667e17e-f666-46bf-b25f-216f8720eea2/deploy-status"
        alt="build status"
      />
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
