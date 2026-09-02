# Repository Mapping Summary

## Career Page Data Flow

### Frontend Form
- **File**: `app/careers/apply/page.tsx`
- **Component**: `CareersApplicationPanel` (`components/sections/CareersApplicationPanel.tsx`)
- **Fields Collected**:
  - `portfolioUrl` (for LinkedIn or portfolio URL)
  - `resumeUrl` (for resume URL)
  - Other fields: name, workEmail, phone, roleTrack, whyJoin

### Validation
- **File**: `components/sections/CareersApplicationPanel.tsx` (lines 100-105)
- Validates both URLs using `isValidHttpUrl()` function
- Also validated in backend via `validateLeadVaultInsert` in `lib/enterpriseVault.ts` (lines 149-154)

### API Endpoint
- **File**: `app/api/lead-capture/route.ts`
- Processes form submission
- Calls `validateLeadVaultInsert` to validate and structure data
- For career submissions, creates `careerDetails` object containing:
  ```typescript
  careerDetails: {
    phone,
    roleTrack: roleTrack as CareerRoleTrack,
    portfolioUrl,
    resumeUrl,
  }
  ```

### Database Storage
- **File**: `lib/enterpriseVault.ts`
- **Function**: `persistLeadVaultRecord` (lines 243-269)
- Stores data in Neon PostgreSQL database via Prisma
- **Storage Mechanism**:
  - Core fields (name, workEmail, etc.) stored in dedicated columns
  - `careerDetails` object stored as JSON in the `metadata` column
  - Prisma schema (`prisma/schema.prisma`): `metadata String @default("{}") @db.Text`

### Database Schema
- **File**: `prisma/schema.prisma`
- **Model**: `Lead`
- **Relevant Field**: 
  ```prisma
  metadata String @default("{}") @db.Text // JSON string for additional data
  ```

## Conclusion
✅ **Yes, the resume link and LinkedIn link (via portfolioUrl) are being saved to the Neon DB.**

They are stored as part of the `careerDetails` object within the `metadata` JSON field of the `Lead` table in your Neon PostgreSQL database.

The data flow is:
Form Submission → API Validation → Prisma ORM → Neon PostgreSQL (metadata JSON field)