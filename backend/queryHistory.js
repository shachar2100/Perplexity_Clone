const fs = require('fs').promises;
const path = require('path');

class QueryHistory {
  constructor() {
    this.historyDir = path.join(__dirname, 'query_history');
    this.initDirectories();
  }

  async initDirectories() {
    try {
      await fs.mkdir(this.historyDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directories:', error);
    }
  }

  async saveQuery(question, answer, images, sources) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const queryDir = path.join(this.historyDir, timestamp);
    
    try {
      // Create directory for this query
      await fs.mkdir(queryDir, { recursive: true });
      
      // Save query data
      const queryData = {
        timestamp: new Date().toISOString(),
        question,
        answer,
        sources,
        images: images // Just save the original URLs
      };

      // Save query data as JSON
      await fs.writeFile(
        path.join(queryDir, 'query_data.json'),
        JSON.stringify(queryData, null, 2)
      );

      console.log(`Query saved: ${timestamp}`);
      return timestamp;

    } catch (error) {
      console.error('Error saving query:', error);
      throw error;
    }
  }

  async getAllQueries() {
    try {
      const files = await fs.readdir(this.historyDir);
      const queries = [];

      for (const file of files) {
        const queryPath = path.join(this.historyDir, file);
        const stats = await fs.stat(queryPath);
        
        if (stats.isDirectory()) {
          const dataPath = path.join(queryPath, 'query_data.json');
          try {
            const data = await fs.readFile(dataPath, 'utf8');
            queries.push({
              timestamp: file,
              ...JSON.parse(data)
            });
          } catch (error) {
            console.error(`Error reading query data for ${file}:`, error);
          }
        }
      }

      // Sort by timestamp (newest first)
      return queries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    } catch (error) {
      console.error('Error getting all queries:', error);
      return [];
    }
  }

  async getQuery(timestamp) {
    try {
      const queryPath = path.join(this.historyDir, timestamp, 'query_data.json');
      const data = await fs.readFile(queryPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error getting query ${timestamp}:`, error);
      return null;
    }
  }

  async deleteQuery(timestamp) {
    try {
      const queryPath = path.join(this.historyDir, timestamp);
      await fs.rm(queryPath, { recursive: true, force: true });
      console.log(`Query deleted: ${timestamp}`);
      return true;
    } catch (error) {
      console.error(`Error deleting query ${timestamp}:`, error);
      return false;
    }
  }
}

module.exports = QueryHistory; 