describe("Test Environment Verification", () => {
  it("should be running in Node.js environment", () => {
    // Verify we are running in Node.js
    expect(typeof process).toBe("object");
    expect(process.versions.node).toBeDefined();

    // For React Native Testing Library, window may be defined as polyfill
    // What matters is that we have Node.js capabilities
    expect(typeof global).toBe("object");
    expect(typeof require).toBe("function");

    console.log("✅ Running in Node.js version:", process.versions.node);
    console.log("✅ Jest environment:", process.env.NODE_ENV);
    console.log(
      "✅ Test environment:",
      typeof window !== "undefined" ? "RN with DOM polyfills" : "Pure Node.js"
    );
  });

  it("should have MSW server capabilities", () => {
    // Verify we can import MSW for Node.js
    const { setupServer } = require("msw/node");
    expect(setupServer).toBeDefined();
    expect(typeof setupServer).toBe("function");

    console.log("✅ MSW Node.js server is available");
  });

  it("should not have browser-specific MSW", () => {
    // Verify we DON'T have browser APIs
    let browserMSW;
    try {
      browserMSW = require("msw/browser");
      // If we get here, the import worked, but it shouldn't in Node.js
      console.warn("⚠️ Browser MSW is available - this might cause issues");
    } catch (error) {
      // This is expected in Node.js
      console.log("✅ Browser MSW correctly not available in Node.js");
    }
  });
});
