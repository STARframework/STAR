import React from 'react'
import { Link } from "gatsby"

const footer = ({ siteTitle }) => (
  <footer className="footer-wrap">
    {' '}
    <span className="footer-border" />{' '}
    <div className="footer">
      {' '}
      <span>Made with 💜 by Jad Limcaco.</span>{' '}
      <span className="coffee">
        <a target="_blank" href="https://cash.me/$jad/5">
          Buy me a coffee
        </a>{' '}
        ☕️
      </span>{' '}
    </div>{' '}
  </footer>
)

export default footer
