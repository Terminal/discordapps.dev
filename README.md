# ls.terminal.ink
An open source Discord Bot listing website using Eris, Express and RethinkDB (and no jQuery if you select the `<table>` theme)

## Development Team
Category            | People
------------------- | --------------------------
Lead Developer      | 7coil#3175 (@lepon01)
Secondary Developer | Devoxin#0387 (@Devoxin)

## Translators
Language | Name
-------- | ----------------
French   | Yvan#5761 (@lepeli)
French   | iDroid#4441 (@iDroid27210)
Swedish  | Mackan#7196 (@Sven65)
Chinese  | The Double-Eyed Bus#6889 (@austinhuang0131)

## Installation
1. Install `imagemagick`, `Node.js` 9.0.0, `npm` 5.5.1, `RethinkDB`
1. `git clone https://github.com/terminal/ls.terminal.ink.git`
1. `cd ls.terminal.ink`
1. `npm i`
1. Create `terminal` database with `bots`, `csrf`, `users`, `session` and `i18n` as tables in RethinkDB, by logging into the RethinkDB integrated webserver.
1. `cp config/default.rename.json config/default.json`
1. Edit `config/default.json`
1. `npm start`

## Contributions
- Please use tabs, preferably set to `4` column spacing to maintain alignment
- Install dev dependancies while working on this
- No ESlint errors please. Use `// eslint-disable-line` with permission

### Translations

1. Edit `locales/{locale}.json`
1. Add the tag `lang_{locale}` in your new file as well as `en-gb.json`

## Licence

GNU General Public License v3.0, unless marked within the file.
