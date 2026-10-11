# Changelog

All notable changes to this project are recorded here, one section per sprint.

## [Unreleased]

### Sprint 2 (Oct 12 - 14, 2026), planned
- Flow Designer flow: manager approval, task creation from templates, notifications
- Script Include for due dates and a Business Rule that creates the Employee Asset record

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
