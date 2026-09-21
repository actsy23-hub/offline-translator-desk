# Offline Translator Desk

A private local translation app powered by the QVAC SDK.

Offline Translator Desk translates English text to Spanish using a QVAC-managed Bergamot translation model. Translation inference runs locally through QVAC without requiring a cloud AI inference API.

## Links

- GitHub Repository: https://github.com/actsy23-hub/offline-translator-desk
- Local App: http://localhost:3000

## Features

- English to Spanish translation
- QVAC local AI inference
- No AI API key required
- No cloud AI inference for translation
- Privacy Receipt showing the AI processing path
- Copy translated text
- Clear the workspace
- Simple browser-based interface
- Local Node.js server

## Privacy Receipt

The application displays:

| Property | Status |
| --- | --- |
| AI processing | On device |
| Cloud AI inference | 0 |
| AI API key | None |
| Translation engine | QVAC / Bergamot |

Translation requests are handled by the local application and processed through QVAC.

## How It Works

```text
Browser
  |
  v
Local Node.js Server
  |
  v
QVAC SDK
  |
  v
Bergamot Translation Model
  |
  v
Spanish Translation