  // Wait for the DOM to load
  document.addEventListener('DOMContentLoaded', function() {
    // Get the element with the 'transcend-opt-out' id
    const optOutElement = document.getElementById('transcend-opt-out');

    // Hide the element by default
    optOutElement.style.display = 'none';

    // Check if the user falls under the CPRA regime
    if (airgap.getRegimes().has('CPRA')) {
      // Always display the opt-out element for users in the CPRA regime
      optOutElement.style.display = 'block';

      // Fetch the current consent status
      const consent = airgap.getConsent();

      // Check the SaleOfInfo value and set the text accordingly
      if (consent.purposes.SaleOfInfo) {
        optOutElement.textContent = 'Do Not Sell or Share My Personal Information.';
      } else {
        optOutElement.textContent = 'We No Longer Sell or Share Your Personal Information.';
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
