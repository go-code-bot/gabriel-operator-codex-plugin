#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const configPath = path.resolve(root, process.argv[2] || path.join('assets', 'embed-config.json'));
const contractPath = path.resolve(root, 'references', 'embed-contract.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fail(message) {
  throw new Error(message);
}

const contract = readJson(contractPath);
const payload = readJson(configPath);

if (!payload || typeof payload !== 'object' || Array.isArray(payload)) fail('assets/embed-config.json must be a JSON object.');
if (payload.schemaVersion !== 1) fail('schemaVersion must be 1.');
if (payload.pageId !== contract.pageId) fail(`pageId must be ${contract.pageId}.`);
if (!payload.chatEmbedConfig || typeof payload.chatEmbedConfig !== 'object' || Array.isArray(payload.chatEmbedConfig)) {
  fail('chatEmbedConfig must be an object.');
}
if (payload.embedUrls !== undefined && (!payload.embedUrls || typeof payload.embedUrls !== 'object' || Array.isArray(payload.embedUrls))) {
  fail('embedUrls must be an object when present.');
}

console.log(`Validated embed config for ${contract.pageName || contract.pageId}.`);
