# Analytics events

GA4 property `G-XHE9TH3K6F`, loaded through GTM `GTM-5L3ZD3KW` only after the visitor accepts analytics cookies
(`components/cookie-consent.tsx`). No ad platforms: `ad_storage` stays denied and none are planned.

The site has no forms or online booking, so **contact is the conversion**. A click on a contact link is the best
signal the browser has; it records intent, not a confirmed call or message.

## Events

Pushed to the dataLayer by `lib/analytics.ts` (`track()`), only when consent is granted. Contact links are caught by
one delegated listener (`components/analytics-events.tsx`), so any new `tel:` / WhatsApp / Maps / salon-profile link
is tracked without extra code.

| Event | Fires when | Parameters | GA4 |
|---|---|---|---|
| `phone_click` | a `tel:` link is clicked | `cta_location`, `service_name` | **key event** |
| `whatsapp_click` | a WhatsApp link is clicked | `cta_location`, `service_name`, `link_url` | **key event** |
| `social_dm_click` | the salon's Instagram, Facebook or TikTok profile is opened | `network`, `cta_location`, `link_url` | **key event** |
| `directions_click` | a Google Maps directions link is clicked | `cta_location`, `link_url` | **key event** |
| `announcement_shown` | the laser launch dialog opens | | event |
| `announcement_click` | a dialog action is taken (treatment page or phone) | `link_url` | event |
| `announcement_dismiss` | the dialog closes without an action | | event |
| `faq_open` | an FAQ answer is opened | `faq_question`, `service_name` | event |
| `before_after_used` | the before/after slider is moved (once per page view) | `cta_location` | event |

`cta_location` values: `hero`, `nav`, `mobile_menu`, `mobile_bar`, `featured`, `prices`, `contact`, `popup`,
`footer`, otherwise the section's `aria-labelledby` id. An explicit `data-cta="…"` on an ancestor overrides it.
`service_name` comes from the nearest `data-service` (featured panels) or the treatment page's `data-service-page`.

## GTM setup (one time)

1. GTM → Admin → Import container → `docs/analytics/gtm-import.json`, choose the workspace, **Merge** → **Rename
   conflicting**. It adds one Custom Event trigger, one GA4 Event tag and five Data Layer Variables.
2. Preview: tap Sună / WhatsApp on the site, check the tag fired once per click with its parameters. Publish.
3. GA4 → Admin → Custom definitions: add event-scoped dimensions `cta_location`, `service_name`, `network`,
   `faq_question` (otherwise the parameters are collected but not reportable).
4. GA4 → Admin → Events: mark `phone_click`, `whatsapp_click`, `social_dm_click`, `directions_click` as key events
   (they appear after their first hit; or create them under Key events by name).

Re-verify in five minutes: accept cookies, open GA4 → Admin → DebugView (or GTM Preview), click Sună on a treatment
page; one `phone_click` should arrive with `cta_location` and `service_name` set.
