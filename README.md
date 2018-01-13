# ls.terminal.ink

## Installation
1. Install `imagemagick`, `Node.js` v9.3.0, `npm` 5.5.1, `RethinkDB`
1. `git clone https://github.com/terminal/ls.terminal.ink.git`
1. `cd ls.terminal.ink`
1. `npm i`
1. Create `terminal` database with `bots`, `csrf`, `users`, `session` and `i18n` as tables in RethinkDB, by logging into the RethinkDB integrated webserver.
1. `cp config/default.rename.json config/default.json`
1. Edit `config/default.json`
1. `npm start`

### Translations

1. Edit `locales/{locale}.json`
1. Add the tag `lang_{locale}` in your new file as well as `en-gb.json`
