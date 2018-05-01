# discordbots.co.uk legacy backend [![Build Status](https://travis-ci.org/Terminal/ls.terminal.ink.svg?branch=master)](https://travis-ci.org/Terminal/ls.terminal.ink)
An open source Discord Bot listing website using Eris, Express and RethinkDB (and no jQuery if you select the `<table>` theme)

## Development Team
Category            | People
------------------- | --------------------------
Lead Developer      | 7coil#3175 ([@lepon01](https://github.com/lepon01))
Secondary Developer | Devoxin#0387 ([@Devoxin](https://github.com/Devoxin))

## Translators
Language | Name
-------- | ----------------
Chinese  | The Double-Eyed Bus#6889 ([@austinhuang0131](https://github.com/austinhuang0131))
Dutch    | Auxim#2994 ([@GeoffreyWesthoff](https://github.com/GeoffreyWesthoff))
French   | Yvan#5761 ([@lepeli](https://github.com/lepeli))
French   | iDroid#4441 ([@iDroid27210](https://github.com/iDroid27210))
German   | MrLar#8117 ([@MrLar](https://github.com/MrLar))
Swedish  | Mackan#7196 ([@Sven65](https://github.com/Sven65))

## Installation
1. Install `imagemagick`, `Node.js` v9.5.0, `npm` 5.6.0, `RethinkDB`
1. Run `rethinkdb`
1. `git clone https://github.com/terminal/ls.terminal.ink.git`
1. `cd ls.terminal.ink`
1. `npm i`
1. `cp config/default.rename.json config/default.json`
1. Edit `config/default.json`
1. `npm start`

### Installation on Docker
1. `git clone https://github.com/terminal/ls.terminal.ink.git && cd ls.terminal.ink`
1. `docker-compose build` to build the container
1. `docker-compose up` to start the container
1. `docker-compose start` to start the container in the background

*Notice, when updating the list, you must pull and then `docker-compose build` to update*

### Translations

1. Edit `locales/{locale}.json`
1. Add the tag `lang_{locale}` in your new file as well as `en-gb.json`

## Licence

```
/**
    ls.terminal.ink Discord Bot List Server
    Copyright (C) 2018 Moustacheminer Server Services
    Copyright (C) 2018 Terminal.ink

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
```
