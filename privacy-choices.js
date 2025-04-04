document.addEventListener('DOMContentLoaded', function() {
  const optOutElement = document.querySelector('[transcend="do-not-sell"]');
  optOutElement.style.display = 'none';

  // Check if the user falls under the do-not-sell regime
  if (airgap.getRegimes().has('do-not-sell')) {
    optOutElement.style.display = 'flex';

    // Fetch the current consent status
    const consent = airgap.getConsent();

    // Check the SaleOfInfo and Advertising values and set text
    if (consent.purposes.SaleOfInfo === false && consent.purposes.Advertising === false) {
      optOutElement.textContent = 'We No Longer Sell or Share Your Personal Information.';
    } else {
      optOutElement.textContent = 'Do Not Sell or Share My Personal Information.';
    }

    // Add a click event listener
    optOutElement.addEventListener('click', function() {
      // Open the Transcend Consent Manager with the CompleteOptions view
      transcend.showConsentManager({ viewState: 'CompleteOptions' });
    });

    // Listen for changes in consent
    airgap.addEventListener(
      'consent-change',
      ({ detail: { consent, oldConsent, changes } }) => {
        // Check if changes object is not null and if the consent has changed
        if (changes !== null) {
          optOutElement.textContent = 'Your privacy choices have been updated.';
        }
      }
    );
  }
});
