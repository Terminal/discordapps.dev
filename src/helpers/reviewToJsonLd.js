import Locations from '../data/Locations';

const reviewToJsonLd = (contents, item) => {
  const template = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    description: contents.description,
    name: contents.name,
    image: [
      `${Locations.server}${item.cachedImages.avatar}`,
      ...item.cachedImages.preview.map(img => `${Locations.server}${img}`)
    ],
    sku: item.id
  };
  
  // If there are reviews, add the reviews stuff
  if (item.reviews.length) {
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
  } else {
    return null;
  }

  return JSON.stringify(template);
};

export default reviewToJsonLd;
