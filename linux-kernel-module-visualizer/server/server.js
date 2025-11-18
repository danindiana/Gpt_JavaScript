const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

/**
 * Retrieves Linux kernel modules and their dependencies
 * @returns {Promise<Array>} Array of module objects with name and dependencies
 */
function getKernelModules() {
  return new Promise((resolve, reject) => {
    exec('lsmod', (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing lsmod:', error);
        reject(error);
        return;
      }

      if (stderr) {
        console.warn('lsmod stderr:', stderr);
      }

      try {
        // Parse lsmod output
        const lines = stdout.split('\n').slice(1); // Skip header
        const modules = lines
          .filter(line => line.trim().length > 0)
          .map(line => {
            const parts = line.split(/\s+/);
            const [name, size, used, usedBy] = parts;

            return {
              name: name || 'unknown',
              size: parseInt(size) || 0,
              used: parseInt(used) || 0,
              usedBy: usedBy ? usedBy.split(',').filter(dep => dep.length > 0) : []
            };
          });

        console.log(`Successfully retrieved ${modules.length} kernel modules`);
        resolve(modules);
      } catch (parseError) {
        console.error('Error parsing lsmod output:', parseError);
        reject(parseError);
      }
    });
  });
}

/**
 * GET /api/modules
 * Returns JSON array of kernel modules and their dependencies
 */
app.get('/api/modules', async (req, res) => {
  try {
    const modules = await getKernelModules();
    res.json({
      success: true,
      count: modules.length,
      data: modules,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve kernel modules',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /
 * Serves the main HTML page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path
  });
});

// Start server
app.listen(port, () => {
  console.log(`\n===========================================`);
  console.log(`Kernel Module Visualizer Server Started`);
  console.log(`===========================================`);
  console.log(`Server: http://localhost:${port}`);
  console.log(`API Endpoint: http://localhost:${port}/api/modules`);
  console.log(`Health Check: http://localhost:${port}/api/health`);
  console.log(`===========================================\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, closing server gracefully...');
  process.exit(0);
});
