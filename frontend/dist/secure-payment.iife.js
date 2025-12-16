
/**
 * Secure Payment Library
 * Public API exposed via SecurePayment.create
 */
(function () {
  const SecurePayment = {};

  /**
   * Initializes and mounts a secure payment form.
   * @param {string} containerId
   * @param {{onSubmit: Function, onError: Function}} options
   */
  SecurePayment.create = function (containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) throw new Error('Container not found');

    const el = document.createElement('secure-payment-form');
    el.addEventListener('submit', e => options.onSubmit?.(e.detail));
    el.addEventListener('error', e => options.onError?.(e.detail));
    container.appendChild(el);
  };

  class SecurePaymentForm extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({ mode: 'closed' });
      this.root.innerHTML = `
        <style>
          button { padding: 8px 12px; margin-top: 10px; }
        </style>
        <iframe sandbox="allow-scripts allow-same-origin"
          style="width:100%;border:0;height:200px"></iframe>
        <button>Submit</button>
      `;
    }

    connectedCallback() {
      const iframe = this.root.querySelector('iframe');
      const button = this.root.querySelector('button');
      iframe.src = './frontend/src/iframe/iframe.html';

      window.addEventListener('message', e => {
        if (e.origin !== window.location.origin) return;
        if (e.data.type === 'ERROR') {
          this.dispatchEvent(new CustomEvent('error', { detail: e.data.message }));
        }
        if (e.data.type === 'VALID') {
          this.submit(e.data.payload);
        }
      });

      button.onclick = () =>
        iframe.contentWindow.postMessage({ type: 'SUBMIT' }, window.location.origin);
    }

    async submit(payload) {
      try {
        const res = await fetch('http://localhost:3000/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw data;
        this.dispatchEvent(new CustomEvent('submit', { detail: data }));
      } catch (err) {
        this.dispatchEvent(new CustomEvent('error', { detail: err.error || 'Server error' }));
      }
    }
  }

  customElements.define('secure-payment-form', SecurePaymentForm);
  window.SecurePayment = SecurePayment;
})();
