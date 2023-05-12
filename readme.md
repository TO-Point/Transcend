## Install
/consent-manager.js needs to be added to the page.
The page also needs a clickable element with the id="transcend-opt-out" which is the UI for reporting consent preference status and the method to open the mananger.
```
<div id="transcend-opt-out" class="text-size-small" style="display: none;">Do not sell or share my personal information.</div>
```


## Styling
All of this is managed through Transcend web app, and loaded through an airgap script param.
The css file in this repo is a back up. (Transcend wiped custom styles once already.)

## Some notes that helped me debug things

**Show UI**
```
transcend.showConsentManager({ viewState: 'CompleteOptions' })
 ```
**Check consent:**
```
// Listen for consent change events
airgap.addEventListener(
  'consent-change',
  ({ detail: { consent, oldConsent, changes } }) => {
    // Track using Segment's `analytics.js`
    analytics.track('Consent Changed', {
      consent,
      oldConsent,
      changes,
      ...getConsentMetadata(),
    });
  }
);
```
**Reponses from checking consent:**
```
const data = {
  confirmed: true,
  purposes: {
    Advertising: true,
    Functional: true,
    SaleOfInfo: false,
    Analytics: true,
  },
```
**Check Regime**
```
airgap.getRegimes().has('CPRA')
```
(There are other regimes, like: 'GDPR' we only care about CPRA.)

**Typings**
https://github.com/transcend-io/airgap.js-types/blob/main/src/core.ts#L205-L213
**Regime Overrides**
https://docs.transcend.io/docs/consent/reference/debugging-and-testing
