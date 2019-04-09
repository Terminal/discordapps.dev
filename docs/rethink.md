# Reviews

## Bots Page Query

```js
r.table('apps')
  .get('473861594749861909')
  .merge(bot => ({
    authors: r.table('users').getAll(r.args(bot('authors'))).coerceTo('array'),
    reviews: r.table('reviews')
      .filter(review => review('bot').eq(bot('id')))
      .sample(10)
      .coerceTo('array'),
    ratings: r.table('reviews')
      .group('rating')
      .filter(review => review('bot').eq(bot('id')))
      .count()
      .ungroup()
  }))
```

## Obtain all reviews for ls.terminal.ink

```js
r.table('reviews')
  .filter(review => review('bot').eq('473861594749861909'))
  .pluck(10)
```

## Obtain all reviews for ls.terminal.ink

```js
r.table('reviews')
  .group('rating')
  .filter(review => review('bot').eq('473861594749861909'))
  .coerceTo('object')
```

## Count Reviews

```js
r.table('reviews')
  .group('rating')
  .filter(review => review('bot').eq('473861594749861909'))
  .count()
```

## Insert a review

```js
r.table('reviews')
  .insert({
    bot: '473861594749861909',
    author: '190519304972664832',
    rating: 4,
    text: 'This bot doesn\'t actually work, but the website is cool enough',
    language: 'en-GB'
  })
```
