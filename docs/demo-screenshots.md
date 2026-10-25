# Demo analytics illustrations

The mobile analytics and response-performance images use fictional data, not
actual company results. Each image carries its own demo label; the homepage
captions and alt text identify them as illustrations. The SVGs follow the current
mobile Analytics layout and desktop response-performance card. They are authored
as vector UI assets, not edited account captures.

Regenerate with `node scripts/build-demo-screenshots.mjs` (no extra dependency).

| Illustration | Consistent example values |
| --- | --- |
| Commerce | $1,280,000 revenue; 16,000 orders; $80 AOV; $192,000 profit; 15% margin; 192 refunded orders / 1.2% refund rate |
| Services | $184,800 total service revenue; $8,400 ad spend; $50,400 ad-attributed revenue; 6.0x ROAS |
| Response performance | Illustrative elapsed reply times: eBay 1.2h, Amazon 1.8h, website chat 0.1h. These are not live recalculated results. |

Revenue charts contain 30 daily values summing to each headline total. Prior
period totals give +32% commerce and +40% service growth. The response demo uses
equal daily sample sizes; headline SLA percentages are calculated from the daily
series. Production analytics remain based on real account data.

The three superseded account captures were removed from the current public
assets. This does not rewrite Git history or invalidate previously cached copies.
