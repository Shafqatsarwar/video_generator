// Quick test runner
const { runTests } = require('./test-video-generator');

runTests()
  .then(r => {
    console.log('\nTests completed:', r.passed, '/', r.total, 'passed\n');
    process.exit(r.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Test error:', error);
    process.exit(1);
  });
