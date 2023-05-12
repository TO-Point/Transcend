// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
// Get the element with the 'transcend-opt-out' id
const optOutElement = document.getElementById('transcend-opt-out');

// Hide the element by default
optOutElement.style.display = 'none';

// Check if the user falls under the CPRA regime
if (airgap.getRegimes().has('CPRA')) {
    optOutElement.style.display = 'block';

    // Set the initial text
    optOutElement.textContent = 'Manage how Point handles your personal information.';

    // Add a click event listener
    optOutElement.addEventListener('click', function() {
    // Open the Transcend Consent Manager with the CompleteOptions view
    transcend.showConsentManager({ viewState: 'CompleteOptions' });
    });
    airgap.addEventListener(
    'consent-change',
    ({ detail: { consent, oldConsent, changes } }) => {
        // Check if changes object is not null and if the consent has changed
        if (changes !== null) {
        optOutElement.textContent = 'We have updated your personal information preferences.';
        }
    }
    );
}
});
