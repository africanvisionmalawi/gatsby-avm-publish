import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { styled } from "linaria/react"
import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

dayjs.extend(advancedFormat)

const IndexPage = () => {
  const [disableBtn, setDisableBtn] = useState(false)
  const [disablePreviewBtn, setDisabledPreviewBtn] = useState(false)
  const [lastUpdated, setLastUpdated] = useState("")
  const [imageRefresh, setImageRefresh] = useState("")

  const btnText = "Publish site"
  const btnTextUpdating = "Site updating"
  const btnPreviewText = "Restart preview"
  const btnPreviewTextUpdating = "Preview updating"

  const previewTimer = setTimeout(() => {
    setDisabledPreviewBtn(false)
  }, 10000)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisableBtn(false)
    }, 10000)
  }, [disableBtn])

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

  const handlePreviewSubmit = async e => {
    e.preventDefault()
    setDisabledPreviewBtn(true)
    const url = process.env.GATSBY_CLOUD_PREVIEW_BUILD

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

    await previewTimer
  }

  const handleClick = e => {
    const refreshCount = Math.random()
    setImageRefresh("x" + refreshCount)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Heading>AVM publish page</Heading>
      <Columns>
        <Col>
          <h2>Click the button below to start a build of the site</h2>
          {disableBtn ? (
            <Btn className="disabled">{btnTextUpdating}</Btn>
          ) : (
            <Btn onClick={e => handleSubmit(e)}>{btnText}</Btn>
          )}
          <p>
            This should take upto 5 mins to complete, but shouldn't be no more
            than 3 mins.
          </p>
          <p>
            This button will show the current state of the latest build, click
            on it to refresh the button and show the latest state.
          </p>
          <BuildBtn>
            <img
              src={`https://api.netlify.com/api/v1/badges/f6e1ff52-323f-4c7f-b2a7-c1980c9d7051/deploy-status?a=${imageRefresh}`}
              onClick={e => handleClick(e)}
            />
          </BuildBtn>
        </Col>
        <Col>
          <h2>Click the button below to restart the preview server</h2>
          <p>This should take anything from around 20secs to 1m 30s.</p>
          {disablePreviewBtn ? (
            <Btn className="disabled">{btnPreviewTextUpdating}</Btn>
          ) : (
            <Btn onClick={e => handlePreviewSubmit(e)}>{btnPreviewText}</Btn>
          )}

          <p>
            <a href="https://preview-avmsite21.gtsb.io/" target="_blank">
              Open preview server
            </a>{" "}
            in new window.
          </p>
        </Col>
      </Columns>
    </Layout>
  )
}

const Heading = styled.h1`
  text-align: center;
`

const Btn = styled.button`
  appearance: none;
  background: #007a70;
  border: 1px solid #007a70;
  border-radius: 6px;
  color: #fff;
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

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const Col = styled.div`
  padding: 0 1rem;
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`

export default IndexPage
