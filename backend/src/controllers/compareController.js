const productStore = require('../services/productStore');

// @desc    Compare 2 to 4 products side-by-side with AI analysis
// @route   POST /api/compare
const compareProducts = async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide between 2 and 4 product IDs for comparison.'
      });
    }

    if (productIds.length > 4) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 4 products can be compared simultaneously.'
      });
    }

    const products = await productStore.getByIds(productIds);

    if (products.length < 2) {
      return res.status(404).json({
        success: false,
        message: 'Could not find sufficient products matching the provided IDs.'
      });
    }

    // 1. Identify "Best in Class" highlights
    let lowestPriceId = products[0].id;
    let minPrice = products[0].price;

    let highestRatingId = products[0].id;
    let maxRating = products[0].rating;

    let bestValueId = products[0].id;
    let maxValueScore = products[0].valueScore || 8.0;

    products.forEach(p => {
      if (p.price < minPrice) {
        minPrice = p.price;
        lowestPriceId = p.id;
      }
      if (p.rating > maxRating) {
        maxRating = p.rating;
        highestRatingId = p.id;
      }
      if ((p.valueScore || 8.0) > maxValueScore) {
        maxValueScore = p.valueScore || 8.0;
        bestValueId = p.id;
      }
    });

    // 2. Synthesize AI Comparative Summary
    const winnerProduct = products.find(p => p.id === bestValueId) || products[0];
    const pNames = products.map(p => p.name).join(' vs ');

    const comparisonSummary = {
      title: `Comparative Analysis: ${pNames}`,
      bestValueProductId: bestValueId,
      lowestPriceProductId: lowestPriceId,
      highestRatingProductId: highestRatingId,
      winner: {
        id: winnerProduct.id,
        name: winnerProduct.name,
        price: winnerProduct.price,
        rating: winnerProduct.rating,
        valueScore: winnerProduct.valueScore,
        verdict: `We recommend ${winnerProduct.name} as the top overall choice. It delivers the highest value-for-money score (${winnerProduct.valueScore}/10) while offering exceptional benchmark stability and balanced performance for its segment.`
      },
      specHighlights: {
        priceWinner: products.find(p => p.id === lowestPriceId)?.name,
        ratingWinner: products.find(p => p.id === highestRatingId)?.name,
        valueWinner: winnerProduct.name
      }
    };

    res.status(200).json({
      success: true,
      products,
      comparisonSummary
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  compareProducts
};
