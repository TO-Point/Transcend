//Not Stable 040425
//Custom consent UI + Privacy Choices UI in footer
document.addEventListener('DOMContentLoaded', function () {
  function runWhenAirgapReady() {
    if (window.airgap && typeof airgap.ready === 'function') {
      airgap.ready(() => {
        const optOutElement = document.querySelector('[transcend="do-not-sell"]');
        const cookieUiElement = document.querySelector('[transcend="cookie-ui"]');
        const acceptButtons = document.querySelectorAll('[transcend="accept-cookies"]');
        const rejectButtons = document.querySelectorAll('[transcend="reject-cookies"]');

        if (optOutElement) optOutElement.style.display = 'none';
        if (cookieUiElement) cookieUiElement.style.display = 'none';

        const regimeApplies = airgap.getRegimes().has('do-not-sell');
        const advertisingConsent = airgap.getConsent()?.purposes?.Advertising;

        const isConsentUnset = advertisingConsent === 'Auto';

        if (regimeApplies && isConsentUnset) {
          if (optOutElement) optOutElement.style.display = 'flex';
          if (cookieUiElement) cookieUiElement.style.display = 'flex';

          acceptButtons.forEach(button => {
            button.addEventListener('click', (event) => {
              airgap.optIn({ interaction: event });
            });
          });

          rejectButtons.forEach(button => {
            button.addEventListener('click', (event) => {
              airgap.optOut({ interaction: event });
            });
          });
        }

        if (optOutElement && window.transcend && typeof transcend.showConsentManager === 'function') {
          optOutElement.addEventListener('click', () => {
            transcend.showConsentManager({ viewState: 'AcceptAllRejectAllToggle' });
          });
        }

        airgap.addEventListener('consent-change', ({ detail: { changes } }) => {
          if (changes !== null && cookieUiElement) {
            cookieUiElement.style.display = 'none';
            if (optOutElement) {
              optOutElement.textContent = 'Your privacy choices have been updated.';
            }
          }
        });
      });
    } else {
      setTimeout(runWhenAirgapReady, 100);
    }
  }

  runWhenAirgapReady();
});
