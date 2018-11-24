module.exports = (item, average, count) => {
  const template = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    description: item.contents.description,
    name: item.contents.name,
    image: item.cachedImages.avatar
  };

  if (typeof average === 'string' && typeof count === 'number') {
    template.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: average,
      reviewCount: count.toString()
    };
    template.review = [];
    for (let i = 0; i < item.reviews.length; i += 1) {
      template.review.push({
        '@type': 'Review',
        author: item.reviews[i].author.username,
        datePublished: `${item.reviews[i].date.getUTCFullYear()}-${item.reviews[i].date.getUTCMonth() + 1}-${item.reviews[i].date.getUTCDate()}`,
        description: item.reviews[i].text,
        reviewRating: {
          '@type': 'Rating',
          bestRating: '5',
          ratingValue: item.reviews[i].rating.toString(),
          worstRating: '1'
        }
      });
    }
    console.log(item);
  }

  return template;
};
