# States

- queue
- approved
- denied
- deleted

```js
r.table('bots').filter({
  verified: false
}).update({
  state: 'queue'
})
```

```js
r.table('bots').filter({
  verified: true
}).update({
  state: 'verified'
})
```
