# API
---

## Token

Tokens are provided on a per-bot basis. View your bot's terminal.ink token by finding your bot and clicking the Token button.

When a token is required (When _token needed_ is shown), please add your token to your HTTP `Authorization` header.

`Authorization: dd8c7533eabfa62174a549f7b11678962ec00f8727537`  

## Methods

### USE `/test/:id` _token needed_
Test your token.

#### Returns
```json
{
	"message": "OK"
}
```

### GET `/bots`  
Obtain an array of objects of all bots

### GET `/bots/:id`
Obtain an object for a specific bot

### POST `/bots/:id` _token needed_
Update your bot count!

#### Send
```json
{
	"count": 2321,
}
```

You can also use this.
```json
{
	"server_count": 2321,
}
```

