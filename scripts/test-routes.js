#!/usr/bin/env node

/**
 * Route Testing Script
 * 
 * Tests all routes in the Next.js application to ensure they return 200 status
 * and have no critical errors.
 * 
 * Usage:
 *   node scripts/test-routes.js
 *   node scripts/test-routes.js > test-results.txt
 */

const http = require('http');

const PORT = 3000;
const HOST = 'localhost';
const BASE_URL = `http://${HOST}:${PORT}`;

// Define all routes to test
const routes = [
  // English routes
  { path: '/en', name: 'Home (EN)' },
  { path: '/en/about', name: 'About (EN)' },
  { path: '/en/blog', name: 'Blog Listing (EN)' },
  { path: '/en/contact', name: 'Contact (EN)' },
  { path: '/en/portfolio', name: 'Portfolio Listing (EN)' },
  { path: '/en/services', name: 'Services Listing (EN)' },
  
  // Vietnamese routes
  { path: '/vi', name: 'Home (VI)' },
  { path: '/vi/about', name: 'About (VI)' },
  { path: '/vi/blog', name: 'Blog Listing (VI)' },
  { path: '/vi/contact', name: 'Contact (VI)' },
  { path: '/vi/portfolio', name: 'Portfolio Listing (VI)' },
  { path: '/vi/services', name: 'Services Listing (VI)' },
  
  // Dynamic routes - English
  { path: '/en/blog/complete-content-marketing-guide', name: 'Blog Post 1 (EN)' },
  { path: '/en/blog/copywriting-tips-that-convert', name: 'Blog Post 2 (EN)' },
  { path: '/en/blog/email-marketing-strategy', name: 'Blog Post 3 (EN)' },
  
  // Dynamic routes - Vietnamese
  { path: '/vi/blog/complete-content-marketing-guide', name: 'Blog Post 1 (VI)' },
  { path: '/vi/blog/copywriting-tips-that-convert', name: 'Blog Post 2 (VI)' },
  
  // Category pages
  { path: '/en/blog/category/copywriting', name: 'Category: Copywriting (EN)' },
  { path: '/en/blog/category/content-strategy', name: 'Category: Content Strategy (EN)' },
  { path: '/en/blog/category/case-studies', name: 'Category: Case Studies (EN)' },
];

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/**
 * Test a single route
 */
function testRoute(route) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const req = http.get(`${BASE_URL}${route.path}`, (res) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          path: route.path,
          name: route.name,
          status: res.statusCode,
          duration,
          success: res.statusCode === 200,
          hasContent: data.length > 0,
          contentLength: data.length,
        });
      });
    });
    
    req.on('error', (err) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      resolve({
        path: route.path,
        name: route.name,
        status: 0,
        duration,
        success: false,
        error: err.message,
      });
    });
    
    // Timeout after 10 seconds
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        path: route.path,
        name: route.name,
        status: 0,
        duration: 10000,
        success: false,
        error: 'Timeout',
      });
    });
  });
}

/**
 * Check if server is running
 */
function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}/en`, (res) => {
      resolve(true);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

/**
 * Format duration
 */
function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Print result
 */
function printResult(result) {
  const status = result.success ? 
    `${colors.green}✓ ${result.status}${colors.reset}` : 
    `${colors.red}✗ ${result.status || 'ERROR'}${colors.reset}`;
  
  const duration = result.duration < 1000 ? 
    `${colors.gray}${formatDuration(result.duration)}${colors.reset}` :
    `${colors.yellow}${formatDuration(result.duration)}${colors.reset}`;
  
  const path = `${colors.cyan}${result.path}${colors.reset}`;
  const name = `${colors.gray}${result.name}${colors.reset}`;
  
  console.log(`${status} ${duration.padStart(8)} ${path.padEnd(50)} ${name}`);
  
  if (result.error) {
    console.log(`${colors.red}   Error: ${result.error}${colors.reset}`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log(`\n${colors.bright}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}           ROUTE TESTING SCRIPT${colors.reset}`);
  console.log(`${colors.bright}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  // Check if server is running
  console.log(`${colors.cyan}Checking if server is running on ${BASE_URL}...${colors.reset}`);
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log(`\n${colors.red}✗ Server is not running!${colors.reset}`);
    console.log(`${colors.yellow}Please start the server first:${colors.reset}`);
    console.log(`  ${colors.cyan}npm run dev${colors.reset} (development)`);
    console.log(`  ${colors.cyan}npm run build && npm start${colors.reset} (production)\n`);
    process.exit(1);
  }
  
  console.log(`${colors.green}✓ Server is running!${colors.reset}\n`);
  console.log(`${colors.bright}Testing ${routes.length} routes...${colors.reset}\n`);
  
  // Test all routes
  const results = [];
  for (const route of routes) {
    const result = await testRoute(route);
    results.push(result);
    printResult(result);
  }
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  const avgDuration = totalDuration / results.length;
  
  console.log(`\n${colors.bright}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}           SUMMARY${colors.reset}`);
  console.log(`${colors.bright}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  console.log(`Total routes tested: ${colors.cyan}${results.length}${colors.reset}`);
  console.log(`Successful:          ${colors.green}${successful}${colors.reset}`);
  console.log(`Failed:              ${failed > 0 ? colors.red : colors.green}${failed}${colors.reset}`);
  console.log(`Average duration:    ${colors.gray}${formatDuration(avgDuration)}${colors.reset}`);
  console.log(`Total duration:      ${colors.gray}${formatDuration(totalDuration)}${colors.reset}`);
  
  if (failed > 0) {
    console.log(`\n${colors.red}${colors.bright}✗ SOME ROUTES FAILED${colors.reset}\n`);
    console.log(`${colors.yellow}Failed routes:${colors.reset}`);
    results.filter(r => !r.success).forEach(r => {
      console.log(`  ${colors.red}✗${colors.reset} ${r.path} - ${r.name}`);
      if (r.error) {
        console.log(`    ${colors.gray}Error: ${r.error}${colors.reset}`);
      }
    });
    console.log();
    process.exit(1);
  } else {
    console.log(`\n${colors.green}${colors.bright}✓ ALL ROUTES PASSED!${colors.reset}\n`);
    process.exit(0);
  }
}

// Run the tests
main().catch((err) => {
  console.error(`\n${colors.red}Fatal error:${colors.reset}`, err);
  process.exit(1);
});

