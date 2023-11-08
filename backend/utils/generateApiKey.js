
// Recursive function to generate a unique random string as API key
function generateAPIKey() {
    const { randomBytes } = require('crypto');
    const apiKey = randomBytes(16).toString('hex');
    const hashedAPIKey = hashAPIKey(apiKey);

    return { hashedAPIKey, apiKey };

}

// Hash the API key
function hashAPIKey(apiKey) {
    const { createHash } = require('crypto');

    const hashedAPIKey = createHash('sha256').update(apiKey).digest('hex');

    return hashedAPIKey;
}

// Generate and log the API key
const { apiKey, hashedAPIKey } = generateAPIKey();
console.log(`Generated API Key: ${apiKey}`);
console.log(`Hashed API Key: ${hashedAPIKey}`);