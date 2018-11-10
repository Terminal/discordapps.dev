# Project Forklift

## Development Team
Category            | People
------------------- | --------------------------
Lead Developer      | 7coil#3175 ([@lepon01](https://github.com/lepon01))
Secondary Developer | Devoxin#0387 ([@Devoxin](https://github.com/Devoxin))

## Deployment
Setup will take about 12 hours.
<!-- Of course not. -->

1. Add your config into the configuration JSON
```json
{
  "rethinkdb": {
    "db": "test",
    "servers": [
      {
        "host": "127.0.0.1",
        "port": 28015
      }
    ],
    "silent": true
  },
  "webserver": {
    "secret": "nekkoya",
    "location": "http://127.0.0.1:8000/",
    "port": 8000
  },
  "discord": {
    "clientID": "473861594749861909",
    "clientSecret": "",
    "scope": [
      "identify"
    ]
  },
  "links": {
    "docs": "https://docs.terminal.ink"
  }
}
```
2. Run RethinkDB
3. From the root folder, run `node .\website\`

## Licence
For licencing, please email `admin@moustacheminer.com`

### Exceptions
`/website/www-root/js/modalPerms.js` is licenced under the MIT licence.
