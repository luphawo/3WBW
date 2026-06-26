# PDF Content Integration Plan

## Source Document
**"Threeways Birdwatch Street Closure — Introduction Letter"** (October 2025, v2024-05)
An 8-page introduction letter for new homeowners of the Threeways Birdwatch Street Closure
(Plover, Jacana & Kestrel Streets), authored by "The Committee."

---

## Gap Analysis

| PDF Content | Website Coverage | Action |
|---|---|---|
| Committee members (names, addresses, phones) | None | New page: `/rules` |
| TRSS Security Services details (armed patrol, 14 cameras, off-site monitoring) | Partial (on `/safety`) | Enhance `/safety` |
| Monthly levy: R1,150/mo, debit order/EFT | None | New `/rules` page section |
| Speed limit (40km/h), pet bylaws, noise rules | None | New `/rules` page |
| Refuse removal procedures (Mon AM, 3 corner points) | None | New `/rules` page |
| Pedestrian gate status (which are locked) | None | New `/rules` page |
| Community WhatsApp groups (2 distinct: Security via Chairperson, Community via Secretary) | Generic CTA only | Enhance WhatsAppAccess component |
| Emergency reporting process (Jhb Water workflow) | Partial | Enhance `/safety` |
| Jhb Roads Agency, Crime Line SMS, Fraud Hotline | None | Enhance `/safety` |
| Closure history (1998, re-approvals) | Partial (on `/about`) | Enhance `/about` |

---

## Proposed Changes

### 1. New Page: `/rules` (Closure Rules & Guidelines)
- Speed limit (40km/h)
- Pet control bylaws
- Noise pollution rules
- Refuse removal schedule & locations
- Verge maintenance
- Street tree management (City Parks)
- Pedestrian gate status (locked gates)

### 2. New Page: `/committee` (Committee & Contacts)
- Committee member cards:
  - Chairperson (17 Kestrel St, 073 171 5148 / 083 456 9118)
  - Compliance (7 Jacana St, 011 705 1115)
  - Secretary (12 Plover St, 072 598 3345)
  - Technical Support (12 Plover St, 072 598 3345)
- Distinguish Security WhatsApp from Community Info Group

### 3. Enhanced `/safety` page
- Add TRSS Security Services as named security provider
- Add 14-camera off-site surveillance system description
- Add Jhb Water reporting workflow (photo → location → name → ref #)
- Add Crime Line SMS (32211) and Fraud Hotline (082 330 9895)
- Add Jhb Roads Agency (potholes: 011 298 5000)
- Add Douglasdale CPF Sector 4 vehicle number (071 675 7156/7)

### 4. Enhanced `Home` page
- Enrich it with the history so that it grabs the reader

### 5. Enhanced `/about` page
- Add detailed history: founded 1998, re-approved 2019, reapplied 2023

### 6. Enhanced WhatsAppAccess component
- Split into two sections:
  - Security Alerts Group (contact Chairperson)
  - Community Info Group (contact Secretary)

---

## File Change Summary

```
New files:
  src/app/rules/page.tsx
  src/app/committee/page.tsx
  public/documents/introduction-letter.pdf      (copy of PDF)

Modified files:
  src/app/safety/page.tsx                       (add TRSS details, contacts, workflows)
  src/app/about/page.tsx                        (add detailed history, PDF link)
  src/components/home/WhatsAppAccess.tsx         (split into two groups)
  src/lib/data.ts                               (add committee data, rules data)
  src/types/index.ts                             (add CommitteeMember type)
  src/components/layout/Navbar.tsx               (add /rules link if needed)
```

---

## Priority Order

1. **High** (safety-critical): Enhance `/safety` page with TRSS details, emergency workflows
2. **Medium**: New `/rules` page with levy info, bylaws, gate status, committee members
3. **Medium**: PDF upload and download links
4. **Low**: Enhanced WhatsAppAccess component split
5. **Low**: Enhanced `/about` history section
