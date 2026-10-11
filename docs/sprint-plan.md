# Sprint Plan

Start: Sat, Oct 10, 2026 | Finish: Fri, Oct 16, 2026

| Sprint | Dates | Focus | Status |
|---|---|---|---|
| 1 | Oct 10 - 11 | Foundation and catalog item | Complete |
| 2 | Oct 12 - 14 | Automation with Flow Designer | Planned |
| 3 | Oct 15 - 16 | Security, reporting and publish | Planned |

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

## Sprint 2: Automation (Oct 12 - 14)

Create update set `Onboarding - Sprint 2` (Application = Employee Onboarding) before starting.

### Day 3 (Mon, Oct 12): Flow, approval, rejection path

- [ ] Create a flow with trigger **Service Catalog** (item = New Hire Onboarding)
- [ ] Add an **Ask for Approval** action, approver = `hiring_manager`
- [ ] Approved path: continue to task creation (Day 4)
- [ ] Rejected path: notify the requester with the reason and close the request
- [ ] Test the approve and reject paths with the test users (Impersonate)

### Day 4 (Tue, Oct 13): Task creation and notifications

- [ ] **Look Up Records** on Onboarding Task Template: Active is true and Department is All or the requested department
- [ ] **For Each** template record, add If conditions for Applies When (Always, or the matching Yes/No variable is true)
- [ ] **Create Catalog Task** inside the loop: short description from Task Name, assignment group from Assigned Group, due date from the Script Include
- [ ] Notify the hiring manager when tasks are created, and each group when a task is assigned
- [ ] Test with laptop, software and desk all Yes, then all No

### Day 5 (Wed, Oct 14): Script Include, Business Rule, end-to-end test

- [ ] Script Include `OnboardingUtils` returning the due date (start date minus Due Days Before Start)
- [ ] Wire the flow to use it for task due dates
- [ ] Business Rule on Catalog Task: when "Issue laptop" closes, create an Employee Asset record (Status = Issued, Issued Date = today)
- [ ] Full end-to-end test: one request produces the right tasks, assignments, notifications and asset record
- [ ] Mark `Onboarding - Sprint 2` Complete and export to XML
- [ ] Take screenshots (flow canvas, execution details, generated tasks, asset record)

**Done when:** one catalog request creates the correct tasks and asset record with no manual steps.

---

## Sprint 3: Polish and Publish (Oct 15 - 16)

Create update set `Onboarding - Sprint 3` (Application = Employee Onboarding) before starting.

### Day 6 (Thu, Oct 15): Reminders, security, reporting

- [ ] Scheduled Job: email the assignment group about onboarding tasks past due
- [ ] Roles and ACLs: HR sees all onboarding requests; IT and Facilities see only their own tasks
- [ ] Reports: pending onboardings, average completion time, tasks by group
- [ ] Dashboard combining the reports
- [ ] Stretch: offboarding catalog item (collect assets, revoke access, close records)

### Day 7 (Fri, Oct 16): Package and publish

- [ ] Mark `Onboarding - Sprint 3` Complete and export to XML
- [ ] Export final seed data
- [ ] Add screenshots to the README
- [ ] Record a 2-3 minute demo video (submit request, approve, tasks created, asset record, dashboard)
- [ ] Write resume bullets using real numbers from testing
- [ ] Post on LinkedIn with the repo and demo links

**Done when:** the repo, demo video and resume bullets are ready to share.
