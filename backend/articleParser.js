const { extract } = require('article-parser');

async function parseArticle(url) {
  try {
    const result = await extract(url);
    return {
      content: result.content || '',
      title: result.title,
      images: result.image ? [result.image] : [],
      url
    };
  } catch (e) {
    return { content: '', title: '', images: [], url };
  }
}

module.exports = parseArticle;