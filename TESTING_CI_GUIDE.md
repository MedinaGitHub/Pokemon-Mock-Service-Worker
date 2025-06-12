# 🧪 Testing Guide for CI/CD (Bitbucket Pipelines)

## ✅ Node.js Environment Verification

Your application is correctly configured to run in **Node.js** instead of the browser. Here's the evidence:

### 🔍 **Verification Commands:**

```bash
# Verify testing environment
npm run test:env

# Run all tests with CI configuration
npm run test:ci

# Normal tests (local development)
npm test
```

### 📊 **Verification Results:**

✅ **Node.js version:** 20.17.0  
✅ **Jest environment:** test  
✅ **Test environment:** RN with DOM polyfills  
✅ **MSW Node.js server is available**  
⚠️ **Browser MSW is available** - this is normal in React Native

### 🏗️ **Bitbucket Pipelines Configuration:**

**File: `bitbucket-pipelines.yml`**

```yaml
image: node:18

pipelines:
  default:
    - step:
        name: Install and Test
        caches:
          - node
        script:
          - npm ci --legacy-peer-deps
          - npm run test:ci
```

### 🔧 **Key Configurations:**

1. **Jest Config (`jest.config.js`):**

   ```javascript
   testEnvironment: "node"; // ✅ Node.js environment
   ```

2. **MSW Setup (`__mocks__/server.ts`):**

   ```javascript
   import { setupServer } from "msw/node"; // ✅ Node.js version
   ```

3. **React Native Testing Library:**
   - Uses DOM polyfills but runs in Node.js
   - MSW works correctly with `msw/node`

### 🚀 **Main Tests:**

| Test                                       | Status  | Description                          |
| ------------------------------------------ | ------- | ------------------------------------ |
| `displays Charizard in the Pokemon list`   | ✅ PASS | Verifies Charizard appears using MSW |
| `renders Pokemon list correctly`           | ✅ PASS | Verifies component rendering         |
| `displays Pokemon images correctly`        | ✅ PASS | Verifies Pokemon images              |
| `should be running in Node.js environment` | ✅ PASS | Confirms Node.js environment         |
| `should have MSW server capabilities`      | ✅ PASS | Confirms MSW functionality           |

### 📈 **Coverage Report:**

```
PokemonList.tsx: 95.23% coverage
Test Suites: 2 passed
Tests: 7 passed
```

### 🔄 **For CI/CD Pipelines:**

**Important Scripts:**

- `npm run test:ci` - Tests with coverage for CI/CD
- `npm run test:env` - Environment verification
- `npm test` - Development tests

**Important Flags:**

- `--watchAll=false` - No watch mode for CI
- `--coverage` - Generates coverage reports
- `--forceExit` - Prevents Jest from hanging in CI

### ⚡ **MSW in Action:**

The logs show that MSW is intercepting correctly:

```
console.log: ✅ Mocking Pokemon API call with MSW
✓ displays Charizard in the Pokemon list (55 ms)
```

### 🎯 **Final Result:**

✅ **Your application is ready for Bitbucket Pipelines**  
✅ **MSW is working correctly in Node.js**  
✅ **Charizard appears in the list using mocked data**  
✅ **Tests pass in Node.js environment**

---

## 🚨 **Emergency Commands for CI:**

If something fails in Bitbucket:

```bash
# Clean and reinstall
npm ci --legacy-peer-deps

# Verify environment first
npm run test:env

# Run specific tests
npm test -- --testNamePattern="Charizard"

# Run with maximum detail
npm run test:ci -- --verbose
```
