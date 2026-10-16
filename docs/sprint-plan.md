# Sprint Plan

Start: Sat, Oct 10, 2026 | Finish: Fri, Oct 16, 2026

| Sprint | Dates | Focus | Status |
|---|---|---|---|
| 1 | Oct 10 - 11 | Foundation and catalog item | Complete |
| 2 | Oct 12 - 15 | Automation with Flow Designer | Complete |
| 3 | Oct 15 - 16 | Reporting and publish | Complete |

If time runs short, cut in this order: offboarding, dashboard, scheduled job. The catalog item, flow and asset table are the core.

---

## Sprint 1: Foundation and Catalog Item (Oct 10 - 11)

### Day 1 (Sat, Oct 10): Scoped app, data model, seed data

- [x] Create the scoped application **Employee Onboarding** in Studio
- [x] Create update set `Onboarding - Sprint 1` (Application = Employee Onboarding) and set it as current
- [x] Create the tables **Employee Asset**, **Onboarding Task Template** and **Software Option**
- [x] Load seed data: 11 task templates and 6 software options
- [x] Create assignment groups: IT Support, HR Operations, Facilities_Employee
- [x] Take screenshots of the tables and seed data
- [x] Create test users: **Test Manager**, **Test NewHire**
- [ ] Confirm Application Access (all scopes; read, create, update, delete) on each table

**Done when:** three tables exist, 11 template rows and 6 software options are loaded, and the update set shows the customer updates.

### Day 2 (Sun, Oct 11): Catalog item

- [x] Create category **Employee Services**
- [x] Create catalog item **New Hire Onboarding** (fulfillment group empty; the flow assigns tasks)
- [x] Add the variables below, in order
- [x] Add 3 Catalog UI Policies (Reverse if false ticked)
- [x] Add 3 Catalog Client Scripts: start date validation, hide All department option, reject All on submit ([scripts](../scripts/client-scripts/))
- [x] Test the form and verify the RITM captures every answer
- [x] Mark `Onboarding - Sprint 1` Complete and export to XML
- [x] Take screenshots (catalog form, order confirmation, RITM with variables)

| Variable | Type | Mandatory |
|---|---|---|
| employee_name | Single Line Text | Yes |
| department | Select Box (choices come from the template table's Department field) | Yes |
| job_title | Single Line Text | Yes |
| start_date | Date | Yes |
| hiring_manager | Reference > User | Yes |
| needs_laptop | Yes/No | No |
| laptop_type | Select Box (Windows Standard, MacBook, High-Performance) | No |
| needs_software | Yes/No | No |
| software_list | List Collector > Software Option | No |
| needs_desk | Yes/No | No |
| office_location | Select Box (Pune, Bengaluru, Hyderabad, Remote) | No |

UI Policies:

- `needs_laptop` is true: show and require `laptop_type`
- `needs_software` is true: show and require `software_list`
- `needs_desk` is true: show and require `office_location`

Client scripts:

- `start_date` onChange: clear a date in the past
- Department onLoad: hide the "All" option
- Department onSubmit: reject "All"

**Done when:** a submitted request creates a RITM with every variable value captured.

---

## Sprint 2: Automation (Oct 12 - 15)

Create update set `Onboarding - Sprint 2` (Application = Employee Onboarding) before starting.

### Day 3 (Mon, Oct 12): Flow, approval, rejection path

- [x] Create a flow with trigger **Service Catalog** (item = New Hire Onboarding)
- [x] Add an **Ask for Approval** action, approver = `hiring_manager`
- [x] Approved path: continue to task creation (Day 4)
- [x] Rejected path: notify the requester with the reason and close the request
- [x] Test the approve and reject paths with the test users (Impersonate)

### Day 4 (Tue, Oct 13): Task creation and notifications

- [x] **Look Up Records** on Onboarding Task Template: Active is true and Department is All or the requested department
- [x] **For Each** template record, add If conditions for Applies When (Always, or the matching Yes/No variable is true)
- [x] **Create Catalog Task** inside the loop: short description from Task Name, assignment group from Assigned Group, due date from the Script Include
- [x] Notify the hiring manager when tasks are created, and each group when a task is assigned
- [x] Test with laptop, software and desk all Yes, then all No

### Day 5 (Wed, Oct 14): Script Include, Business Rule, end-to-end test

- [x] Script Include `OnboardingUtils` returning the due date (start date minus Due Days Before Start)
- [x] Wire the flow to use it for task due dates
- [x] Business Rule on Catalog Task: when "Issue laptop" closes, create an Employee Asset record (Status = Issued, Issued Date = today)
- [x] Full end-to-end test: one request produces the right tasks, assignments, notifications and asset record
- [x] Mark `Onboarding - Sprint 2` Complete and export to XML
- [x] Take screenshots (flow canvas, execution details, generated tasks, asset record)

- [x] Added beyond the plan: Business Rule that closes the request when its last task closes (feeds the completion-time report)

**Done when:** one catalog request creates the correct tasks and asset record with no manual steps.

Notes: the due date is wrapped in a custom flow action because Flow Designer cannot call a Script Include directly. Group notification is a Send Email step in the loop; ServiceNow's stock assignment notification also fires. See [flow.md](flow.md).

---

## Sprint 3: Polish and Publish (Oct 15 - 16)

Create update set `Onboarding - Sprint 3` (Application = Employee Onboarding) before starting.

### Day 6 (Thu, Oct 15): Reminders, security, reporting

- [ ] Scheduled Job: email the assignment group about onboarding tasks past due (deferred)
- [ ] Roles and ACLs: HR sees all onboarding requests; IT and Facilities see only their own tasks (deferred)
- [x] Reports: pending onboardings, completed onboardings, tasks by group (average completion time dropped: Duration is not populated)
- [x] Dashboard combining the reports
- [ ] Stretch: offboarding catalog item (deferred)

### Day 7 (Fri, Oct 16): Package and publish

- [x] Mark `Onboarding - Sprint 3` Complete and export to XML
- [ ] Export final seed data
- [x] Add screenshots to the README
- [ ] Record a 2-3 minute demo video (submit request, approve, tasks created, asset record, dashboard)
- [ ] Write resume bullets using real numbers from testing
- [ ] Post on LinkedIn with the repo and demo links

**Done when:** the repo, demo video and resume bullets are ready to share.
