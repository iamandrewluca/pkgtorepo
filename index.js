const fetch = require('node-fetch')
const express = require('express')
const getInfo = require('hosted-git-info')
const app = express()
const port = 3000

app.get('/:scope/:name?', (req, res) => {
  const parts = [req.params.scope]

  if (req.params.name) {
    parts.push(req.params.name)
  }

  const packageName = parts.join('/')

  fetch(`https://unpkg.com/${packageName}/package.json`)
    .then(response => response.json())
    .then(({ repository }) => {
      if (!repository) {
        res.end('Repository not specified')
        return
      }

      const info = repository.url
        ? getInfo.fromUrl(repository.url)
        : getInfo.fromUrl(repository)

      res.redirect(info.browse())
    })
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}!`)
})