
# Secure Payment Component Library

## 1. Quick Start
Backend:
cd backend
npm install
npm start

Frontend:
npx serve .
Open http://localhost:<port>/demo/index.html

## 2. API Reference
SecurePayment.create(containerId, { onSubmit, onError })

Events:
- submit
- error

## 3. Development
Run tests:
npm test

## 4. Design Notes
- Web Components for framework-agnostic UI
- Iframe for sensitive input isolation
- postMessage for secure communication
- JS factory API mirrors real payment SDKs

## 5. Notes
Demo-focused implementation. Production would tighten sandbox and validation.
