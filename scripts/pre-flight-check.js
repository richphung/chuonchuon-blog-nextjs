#!/usr/bin/env node

/**
 * Pre-Flight Check Script
 * 
 * Runs a series of checks before deployment or after refactoring to ensure
 * everything is working correctly.
 * 
 * Usage:
 *   node scripts/pre-flight-check.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
 * Run a command and return output
 */
function runCommand(command, options = {}) {
  try {
    const output = execSync(command, {
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

/**
 * Print check result
 */
function printCheck(name, success, message = '') {
  const status = success ? 
    `${colors.green}✓${colors.reset}` : 
    `${colors.red}✗${colors.reset}`;
  
  console.log(`${status} ${name}`);
  
  if (message) {
    console.log(`  ${colors.gray}${message}${colors.reset}`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log(`\n${colors.bright}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}           PRE-FLIGHT CHECK${colors.reset}`);
  console.log(`${colors.bright}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  let allPassed = true;
  
  // Check 1: Essential files exist
  console.log(`${colors.cyan}Checking essential files...${colors.reset}\n`);
  
  const essentialFiles = [
    'package.json',
    'next.config.ts',
    'i18n.ts',
    'tsconfig.json',
    'src/app/layout.tsx',
    'src/app/[locale]/layout.tsx',
    'messages/en.json',
    'messages/vi.json',
  ];
  
  for (const file of essentialFiles) {
    const exists = fileExists(file);
    printCheck(file, exists);
    if (!exists) allPassed = false;
  }
  
  console.log();
  
  // Check 2: TypeScript compilation
  console.log(`${colors.cyan}Checking TypeScript compilation...${colors.reset}\n`);
  
  const tscResult = runCommand('npx tsc --noEmit', { silent: true });
  printCheck('TypeScript compiles without errors', tscResult.success);
  if (!tscResult.success) {
    console.log(`${colors.yellow}  Run 'npx tsc --noEmit' to see errors${colors.reset}`);
    allPassed = false;
  }
  
  console.log();
  
  // Check 3: Build succeeds
  console.log(`${colors.cyan}Checking if build succeeds...${colors.reset}\n`);
  console.log(`${colors.gray}This may take a minute...${colors.reset}\n`);
  
  const buildResult = runCommand('npm run build', { silent: false });
  printCheck('Build succeeds', buildResult.success);
  if (!buildResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Check 4: Linting (optional)
  console.log(`${colors.cyan}Checking linting (optional)...${colors.reset}\n`);
  
  if (fileExists('eslint.config.mjs')) {
    const lintResult = runCommand('npm run lint', { silent: true });
    printCheck('No linting errors', lintResult.success, lintResult.success ? '' : 'Warning: Linting errors found (non-critical)');
    // Don't fail on linting errors
  } else {
    printCheck('Linting config found', false, 'No ESLint config found (optional)');
  }
  
  console.log();
  
  // Check 5: Dependencies installed
  console.log(`${colors.cyan}Checking dependencies...${colors.reset}\n`);
  
  const nodeModulesExists = fileExists('node_modules');
  printCheck('node_modules exists', nodeModulesExists);
  if (!nodeModulesExists) {
    console.log(`${colors.yellow}  Run 'npm install' to install dependencies${colors.reset}`);
    allPassed = false;
  }
  
  const packageLockExists = fileExists('package-lock.json');
  printCheck('package-lock.json exists', packageLockExists);
  
  console.log();
  
  // Check 6: Content files
  console.log(`${colors.cyan}Checking content structure...${colors.reset}\n`);
  
  const contentDirs = [
    'content/en',
    'content/vi',
    'content/en/blog/posts',
    'content/en/services',
  ];
  
  for (const dir of contentDirs) {
    const exists = fileExists(dir);
    printCheck(dir, exists);
    if (!exists) {
      console.log(`${colors.yellow}  Warning: Content directory missing${colors.reset}`);
    }
  }
  
  console.log();
  
  // Summary
  console.log(`${colors.bright}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}           SUMMARY${colors.reset}`);
  console.log(`${colors.bright}═══════════════════════════════════════════════════════${colors.reset}\n`);
  
  if (allPassed) {
    console.log(`${colors.green}${colors.bright}✓ ALL CRITICAL CHECKS PASSED!${colors.reset}\n`);
    console.log(`${colors.gray}Your project is ready for deployment or further development.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bright}✗ SOME CHECKS FAILED${colors.reset}\n`);
    console.log(`${colors.yellow}Please fix the issues above before proceeding.${colors.reset}\n`);
    process.exit(1);
  }
}

// Run the checks
main().catch((err) => {
  console.error(`\n${colors.red}Fatal error:${colors.reset}`, err);
  process.exit(1);
});

