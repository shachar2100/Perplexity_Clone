/**
 * Test script for query history functionality
 */
const axios = require('axios');

const BASE_URL = "http://localhost:3000";

async function testQueryHistory() {
  console.log("Testing Query History System");
  console.log("=".repeat(50));

  try {
    // 1. Make a query (this will be saved automatically)
    console.log("1. Making a query...");
    const queryResponse = await axios.get(`${BASE_URL}/query?question=What is artificial intelligence?`);
    console.log("Query completed!");
    console.log("Timestamp:", queryResponse.data.timestamp);
    console.log("Answer length:", queryResponse.data.answer.length, "characters");
    console.log("Sources:", queryResponse.data.sources.length);
    console.log("Images:", queryResponse.data.images.length);
    console.log();

    // 2. Get all history
    console.log("2. Getting all query history...");
    const historyResponse = await axios.get(`${BASE_URL}/history`);
    console.log("Total queries in history:", historyResponse.data.queries.length);
    console.log();

    // 3. Get specific query
    console.log("3. Getting specific query...");
    const timestamp = queryResponse.data.timestamp;
    const specificQuery = await axios.get(`${BASE_URL}/history/${timestamp}`);
    console.log("Query question:", specificQuery.data.query.question);
    console.log("Query timestamp:", specificQuery.data.query.timestamp);
    console.log("Image URLs:", specificQuery.data.query.images);
    console.log();

    console.log("✅ All tests completed successfully!");
    console.log("\n📁 Check the 'query_history' folder to see the saved files:");
    console.log(`   - ${timestamp}/query_data.json (query data with image URLs)`);

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error("❌ Error: Could not connect to the server. Make sure it's running on http://localhost:3000");
    } else {
      console.error("❌ Error:", error.response?.data || error.message);
    }
  }
}

// Run the test
testQueryHistory(); 