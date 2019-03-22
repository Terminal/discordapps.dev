import Locations from '../data/Locations';

const reviewToJsonLd = (contents, item) => {
  const template = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    description: contents.description,
    name: contents.name,
    image: `${Locations.server}${item.cachedImages.avatar}`
  };

  const average = item.reviews.reduce((prev, curr) => prev + curr.rating, 0) / item.reviews.length;

  template.aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: average,
    reviewCount: item.reviews.length
  };
  template.review = [];
  for (let i = 0; i < item.reviews.length; i += 1) {
    const review = item.reviews[i];
    const date = new Date(review.date);
    template.review.push({
      '@type': 'Review',
      author: review.username,
      datePublished: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`,
      description: review.text,
      reviewRating: {
        '@type': 'Rating',
        bestRating: '5',
        ratingValue: review.rating.toString(),
        worstRating: '1'
      }
    });
  }

  return JSON.stringify(template);
};

export default reviewToJsonLd;
