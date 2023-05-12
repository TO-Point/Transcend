**Some notes that helped me debug things**

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
