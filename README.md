\# Offline Translator Desk



A private, local translation app powered by the \*\*QVAC SDK\*\*.



Offline Translator Desk translates English text to Spanish using a QVAC-managed translation model running locally on the user's device. The app does not send translation requests to a cloud AI inference service.



\## Links



\- \*\*GitHub Repository:\*\* https://github.com/actsy23-hub/offline-translator-desk

\- \*\*Local App:\*\* http://localhost:3000



> The app currently runs locally on the user's device. No public cloud deployment is required for the application to function.



\## Features



\- English → Spanish translation

\- Local QVAC inference

\- No AI API key required

\- No cloud AI inference

\- Privacy Receipt showing local processing status

\- Copy translation to clipboard

\- Clear translation workspace

\- Simple browser-based interface

\- QVAC model downloaded and managed locally



\## Privacy Receipt



The application makes the processing path visible:



\- \*\*AI processing:\*\* On device

\- \*\*Cloud AI requests:\*\* 0

\- \*\*API key:\*\* None

\- \*\*Engine:\*\* QVAC / Bergamot



The translation request is processed through QVAC on the local machine.



\## How It Works



```text

Browser

&#x20;  ↓

Local Node.js server

&#x20;  ↓

QVAC SDK

&#x20;  ↓

Bergamot translation model

&#x20;  ↓

Spanish translation

