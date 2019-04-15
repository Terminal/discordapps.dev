# Translations
Welcome to `Terminal.ink`!
We're dedicated to making software accessable and open to greater audiences for free.

There are 2 Discord Nitro Classics (as of writing) up for grabs, for any of the following languages

`Arabic`, `Greek`, `Spanish`, `Estonian`, `Finnish`, `Fijian`, `Gaelic (Scottish)`, `Hindi`, `Italian`, `Japanese`, `Korean`, `Latin`, `Norwegian`, `Portuguese`, `Russian`, `Swedish`, `Turkish`, `Vietnamese`, `Chinese (Simplified)`, `Chinese (Traditional)`

If a popular language is missing here, you may still be eligible.
Please ask a `sudoer` at [discord](https://discord.gg/DwBCgta) for information about translating ls.terminal.ink.

## Note to React Rewrite
Please place keys based on the pathname of where the string will be used, in all lowercase.

- For the 404 error text, try `pages.notfound.title`
- For a footer LICENCE, try `components.footer.licence`

Anything that doesn't fit... well just put it anywhere.

## Instructions
You're ready to translate.

You may want to read [how to do plurals](https://formatjs.io/guides/message-syntax/#plural-format).
For additional help, contact on Discord.

### 1. Copy `en-GB`
```json
"locales": {
  "ar": "Arabic",
  "da": "Danish",
  "de": "German",
  "el": "Greek",
  "en-GB": "English (United Kingdom)",
  "es": "Spanish",
  "et": "Estonian",
  "fi": "Finnish",
  "fj": "Fijian",
  "fr": "French",
  "gd": "Gaelic (Scottish)",
  "hi": "Hindi",
  "it": "Italian",
  "ja": "Japanese",
  "ko": "Korean",
  "la": "Latin",
  "nl": "Dutch",
  "no": "Norwegian",
  "pt": "Portuguese",
  "ru": "Russian",
  "sv": "Swedish",
  "tr": "Turkish",
  "vi": "Vietnamese",
  "zh-cn": "Chinese (Simplified)",
  "zh-tw": "Chinese (Traditional)"
}
```

Rename the `en-gb.json` file to any of the keys.
For instance, if you're translating Russian, rename to `ru.json`

![How to rename a JSON file](/.github/rename.gif)

### 2. Open the file and edit.
If there are features of your language which cannot be represented in English (such as gender for specific buttons), please contact at [discord](https://discord.gg/DwBCgta).

### 3. (optionally) Test the website
Follow the instructions in the [README.md](https://github.com/Terminal/discordapps.dev/tree/ls14)

### 4. Send a pull request
Go to GitHub and initiate a pull request.

# Tools
- [Languages Comparison Tool](https://discordapps.dev/en-GB/languagescomparisontool)
  - Compare English (United Kingdom) with your language to see what keys are missing
