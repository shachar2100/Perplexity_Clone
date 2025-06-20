require('dotenv').config();
const express = require('express');
const { getJson } = require('serpapi');
const parseArticle = require('./articleParser');
const OpenAI = require('openai');
const QueryHistory = require('./queryHistory');

const app = express();
const PORT = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const queryHistory = new QueryHistory();

app.get('/query', async (req, res) => {
  const question = req.query.question;
  const n = 3;

  if (!question) return res.status(400).send({ error: 'Missing question parameter' });

  try {
    const serpResult = await getJson({
      engine: 'google',
      api_key: process.env.SERPAPI_API_KEY,
      q: question,
      num: n
    });

    const links = (serpResult.organic_results || []).slice(0, n).map(r => r.link);
    const articles = await Promise.all(links.map(url => parseArticle(url)));

    const context = articles.map(a => a.content).join('\n\n').slice(0, 8000); // truncate if needed

    // Create source information for the prompt
    const sourceInfo = articles.map((article, index) => 
      `[Source ${index + 1}]: ${article.url}`
    ).join('\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'user', 
          content: `Use the following context to answer the question: "${question}"

Context:
${context}

Sources:
${sourceInfo}

Instructions:
1. Provide a comprehensive answer based on the context above
2. When referencing information, cite the source using [Source 1], [Source 2], etc.
3. Include relevant facts, statistics, and insights from the sources
4. Make sure your answer is well-structured and informative
5. Always attribute information to the appropriate source` 
        }
      ],
      temperature: 0.3
    });

    const answer = completion.choices[0].message.content;
    const images = articles.flatMap(a => a.images).slice(0, 5);
    const sources = articles.map(a => a.url);

    // Save query to history
    const timestamp = await queryHistory.saveQuery(question, answer, images, sources);

    res.json({ 
      answer, 
      images, 
      sources, 
      timestamp,
      message: 'Query saved to history'
    });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal error' });
  }
});

// Get all query history
app.get('/history', async (req, res) => {
  try {
    const queries = await queryHistory.getAllQueries();
    res.json({ queries });
  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).send({ error: 'Failed to get history' });
  }
});

// Get specific query by timestamp
app.get('/history/:timestamp', async (req, res) => {
  try {
    const { timestamp } = req.params;
    const query = await queryHistory.getQuery(timestamp);
    
    if (!query) {
      return res.status(404).send({ error: 'Query not found' });
    }
    
    res.json({ query });
  } catch (error) {
    console.error('Error getting query:', error);
    res.status(500).send({ error: 'Failed to get query' });
  }
});

// Delete specific query
app.delete('/history/:timestamp', async (req, res) => {
  try {
    const { timestamp } = req.params;
    const success = await queryHistory.deleteQuery(timestamp);
    
    if (!success) {
      return res.status(404).send({ error: 'Query not found' });
    }
    
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).send({ error: 'Failed to delete query' });
  }
});

app.listen(PORT, () => {
  console.log(`Search-AI backend running on http://localhost:${PORT}`);
});
