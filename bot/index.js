const { Client } = require('discord.js');
const express = require('express');
const fetch = require('node-fetch');

const config = require('./config');

const app = express();
const client = new Client({
  restTimeOffset: 1000
});

const botOnline = (req, res, next) => {
  if (client.status === 0) {
    next();
  } else {
    res.json({
      ok: false,
      message: 'The Discord bot is offline',
      languages: 'errors.botserver.offline'
    });
  }
};

const isAuthenticated = (req, res, next) => {
  if (req.get('Authorization') === config.webserver.authorization) {
    next();
  } else {
    res.status(400).json({
      ok: false,
      message: 'You are not allowed to fetch the Bot server',
      languages: 'errors.botserver.unauthorised'
    });
  }
};

const userExists = (req, res, next) => {
  const member = req.guild.members.get(req.params.id);
  if (member) {
    req.member = member;
    next();
  } else {
    res.json({
      ok: false,
      message: 'The user was not found by the server',
      languages: 'errors.botserver.usernotfound'
    });
  }
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

app
  .set('json spaces', 4)
  .use(botOnline)
  .use(isAuthenticated)
  .use((req, res, next) => {
    req.guild = client.guilds.get(config.guild);
    if (req.guild) {
      next();
    } else {
      res.json({
        ok: false,
        message: 'The guild was not found by the server',
        languages: 'errors.botserver.guildnotfound'
      });
    }
  })
  .get('/status/:filter', (req, res) => {
    res.json({
      ok: true,
      data: client.users.filter(user => user.presence.status === req.params.filter).array().map(user => user.id)
    });
  })
  .get('/in/:id', userExists, (req, res) => {
    res.json({
      ok: true
    });
  })
  .get('/fixroles', (req, res, next) => {
    fetch(`${config.website}/api/v2/bots`)
      .then(json => json.json())
      .then((data) => {
        if (data.ok) {
          return data.data;
        }
        return new Error('Cannot fetch list of bots');
      })
      .then(data => data.filter(bot => bot.state === 'approved'))
      .then((data) => {
        const authors = {};
        data.forEach(bot => bot.authors.forEach((author) => {
          authors[author] = true;
        }));
        return Object.keys(authors);
      })
      .then((users) => {
        const [add, remove] = req.guild.members
          .filter(member => !member.user.bot)
          .partition(member => users.includes(member.user.id));

        return Promise.all(
          add.map(member => member.addRole(config.roles.dev, 'ls.terminal.ink adjustments')),
          remove.map(member => member.removeRole(config.roles.dev, 'ls.terminal.ink adjustments'))
        );
      })
      .then(() => {
        res.json({
          ok: true
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/addrole/:id', userExists, (req, res, next) => {
    req.member.addRole(config.roles.dev, 'ls.terminal.ink adjustments')
      .then(() => res.json({
        ok: true
      }))
      .catch(err => next(err));
  })
  .get('/removerole/:id', userExists, (req, res, next) => {
    req.member.removeRole(config.roles.dev, 'ls.terminal.ink adjustments')
      .then(() => res.json({
        ok: true
      }))
      .catch(err => next(err));
  })
  .use((err, req, res, next) => {
    if (err) {
      res.json({
        ok: false,
        message: err.stack
      });
    } else {
      next();
    }
  });

client.login(config.token);

const http = app.listen(config.webserver.port);

// When CTRL+C is caught...
process.on('SIGINT', () => {
  console.log('Goodnight!');

  // Close the Express.js server
  http.close(() => {
    console.log('No longer listening');
  });
});
