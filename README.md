# WASSCE Study Hub

Initial architecture for a professional WASSCE preparation website + installable PWA.

## Current resource inspected

`public/resources/inbox/review/new curriculum practical wassce 26.pdf`

The uploaded PDF is a 7-page scanned paper. It contains structured/practical-style Integrated Science material covering:
- human excretory system / nephron
- pH scale and household chemicals
- potato cells in tap/distilled/salt water
- refraction through glass and a sine graph

The source has been deliberately placed in `inbox/review` rather than silently assigning an unverified official paper designation. Its metadata is in `src/data/resources.json`.

## Designed for large future collections

Add future resources to the relevant category folders or to `inbox/review` first. The catalog is metadata-driven so hundreds/thousands of resources can be added without redesigning the UI.

Recommended final taxonomy:

resources/
  past-questions/{subject}/{year}/
  chief-examiners-reports/{subject}/{year}/
  mocks/{subject}/{mock}/
  super-mocks/{subject}/{mock}/
  study-guides/{subject}/
  examination-guides/
  examination-dos-donts/
  inbox/review/
  duplicates/
  rejected/

## Important production architecture

This zip is the frontend/scaffold, not a claim that secure file access or Google rewarded ads are already live.

For production:
1. Put files in private object storage.
2. Store resource metadata in a database.
3. Use authenticated backend endpoints to authorize access.
4. Generate short-lived signed URLs only after authorization.
5. Verify the advertising provider's legitimate reward callback/server-side signal before granting access.
6. Store access expiry timestamps server-side.
7. Revalidate entitlements when the device reconnects.
8. Never rely on client-side JavaScript alone to protect paid/rewarded resources.

Do not implement a fake ad countdown or fake reward.

## Planned modules

- `backend/services/resource-service.js` — catalog/access service contract
- `backend/services/reward-service.js` — rewarded-ad verification contract
- `backend/services/auth-service.js` — account/session contract
- `backend/services/mock-service.js` — mock/super-mock contract
- `admin/` — future admin dashboard
- `tests/` — QA and regression tests
- `docs/` — architecture and data model documentation

## Adding many files

The folder structure intentionally leaves separate category directories and an `inbox/review` staging area. New uploads should be inspected and classified before they are moved into final folders.
