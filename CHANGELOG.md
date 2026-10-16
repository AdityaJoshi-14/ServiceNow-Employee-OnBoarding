# Changelog

All notable changes to this project are recorded here, one section per sprint.

## [Unreleased]

### Deferred
- Overdue-task scheduled job, roles and ACLs, offboarding item

## Sprint 3 (Oct 15 - 16, 2026), complete

### Added
- Update set `Onboarding - Sprint 3`, exported as `update-sets/sprint-3.xml`
- Platform Analytics visualizations: **Pending Onboardings** and **Completed Onboardings** (single scores on Requested Item) and **Onboarding Tasks by Group** (horizontal bar, grouped by assignment group and stacked by state)
- **Employee Onboarding** dashboard combining the three
- Demo video, resume bullets and screenshots

### Notes
- An average-completion-time tile was tried and dropped, because Duration is not populated on these requests and it showed 0 s
- The export also holds an untitled dashboard and an unused widget created while building; they are harmless

## Sprint 2 (Oct 12 - 15, 2026), complete

### Added
- Update set `Onboarding - Sprint 2`, exported as `update-sets/sprint-2.xml`
- Flow **New Hire OnBoarding Flow**: Service Catalog trigger, hiring manager approval, rejection path (closes the request and emails the requester with the reason)
- Task generation: looks up Onboarding Task Template rows for All and the requested department, loops over them, and creates a catalog task for each template whose Applies When condition matches the form answers
- Script Include `OnboardingUtils` with `getDueDate()` and the custom flow action **Calculate Task Due Date** that wraps it
- Emails: one to the hiring manager after the loop, one per task to its assignment group
- Business Rule that creates an Employee Asset record (Laptop, Issued) when the "Issue Laptop" task closes, with a duplicate check
- Business Rule that closes the requested item when its last task closes
- Cross-scope privileges (auto-granted when the scripts first ran) captured in the update set
- `docs/flow.md` and `scripts/` folders for the Script Include, flow action and Business Rules

### Changed
- Seed data and docs use the real choice values for Asset Type (`lp`, `mo`, `ac`, `sl`) and Status (`rq`, `is`, `rr`)

### Verified
- Engineering request with laptop, software and desk all Yes creates 8 tasks; all No creates 5
- Tasks reach the right groups (IT Support, HR Operations, Facilities_Employee) with due dates 1 to 5 days before the start date
- Closing "Issue Laptop" creates one Employee Asset record; closing it again creates no duplicate
- The requested item closes when its last task closes

## Sprint 1 (Oct 10 - 11, 2026), complete

### Added
- Scoped application **Employee Onboarding** (`x_1901336_employ_0`) created in Studio
- Update set `Onboarding - Sprint 1` to track all Sprint 1 changes
- Table **Employee Asset** with columns: Employee, Asset Type, Serial Number, Issued Date, Status, Onboarding Request
- Table **Onboarding Task Template** with columns: Department, Task Name, Assigned Group, Due Days Before Start, Applies When, Active
- Table **Software Option** with columns: Name, Active
- Choice values for Asset Type, Status, Department and Applies When
- Seed data: 11 onboarding task templates and 6 software options
- Assignment groups: IT Support, HR Operations, Facilities_Employee
- Test users: Test Manager, Test NewHire
- Service Catalog category **Employee Services** and item **New Hire Onboarding** with 11 variables
- Three Catalog UI Policies that show and require Laptop Type, Software List and Office Location
- Three Catalog Client Scripts: past start date validation, hide the "All" department option, reject "All" on submit
- Department choices sourced from the Department field on Onboarding Task Template
- Repository structure, README and documentation

### Verified
- A submitted request creates a requested item that captures every variable value
