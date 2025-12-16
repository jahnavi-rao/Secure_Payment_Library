
# Secure Payment Component Library

A lightweight, framework-agnostic Web Component for securely collecting and tokenizing payment data using a sandboxed iframe, Shadow DOM encapsulation, and a simple backend API.

This project was built as part of the Intellirent Senior JavaScript Engineer (Full-Stack) code challenge and demonstrates modern JavaScript architecture, security-first design, and full-stack engineering practices.

## 1. Quick Start
Backend:
cd backend
npm install
npm start

Backend runs at:
http://localhost:3000

Frontend:
npx serve .
Open http://localhost:<port>/demo/index.html

Use test values:
Card number: 4242 4242 4242 4242
Expiry: 12/30

## 2. API Reference
SecurePayment.create(containerId, { onSubmit, onError })

Events:
- submit: Fired when validated data is successfully tokenized
- error: Fired when validation or API submission fails

## 3. Development
Run tests:
npm test

Tests include:

- Card number validation
- Expiry validation
- Component initialization
- postMessage communication
- Submit event behavior

## 4. Design Notes
- Web Components for framework-agnostic UI
- Shadow DOM ensures isolated styling and structure
- Iframe for sensitive input isolation
- postMessage for secure communication
- JS factory API mirrors real payment SDKs
  
## Project Structure
backend/    – Tokenization API (Node.js)
frontend/   – Web Component source + bundled output
demo/       – Demonstration page

## 5. Notes
Demo-focused implementation. Production would tighten sandbox and validation.
Architecture is intentionally minimal to highlight component boundaries.
