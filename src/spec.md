# Specification

## Summary
**Goal:** Build a fully client-side, responsive receipt generator that previews and exports an A4 PDF containing two identical copies of the same receipt per page.

**Planned changes:**
- Create a single-page form for receipt details: locked Company Name (“AUTO ELITE PRIVATE LIMITED”), Customer Name, Order Number, auto-generated Receipt Number, and auto-filled (editable) Date.
- Implement a Payments section with add/remove rows (Mode: Cash/UPI/Card/Bank Transfer; Amount; UTR/Transaction Number) and real-time Total Amount calculation with non-negative numeric validation.
- Build a print-friendly receipt preview with a minimal, premium layout: logo + company header, receipt metadata, payment breakdown table, total amount, and an authorized signature line.
- Add a Print Preview mode showing the full A4 page layout with two identical receipt copies.
- Implement one-click client-side PDF generation (jsPDF or html2pdf) to download an A4 portrait PDF with two identical receipts, clean margins, and optional separator/cut line.
- Add a client-side logo upload workflow with a default ATHER logo used in preview and PDF unless replaced.
- Provide a “new/reset receipt” action that regenerates the receipt number while keeping it stable during edits.

**User-visible outcome:** Users can fill in receipt details, manage multiple payments with an auto-updating total, see a print-ready preview (including the two-copy A4 layout), upload a company logo, and download an A4 PDF with two identical receipt copies—without any backend.
