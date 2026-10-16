<div align="center">

# Employee Onboarding Automation

**A scoped ServiceNow application that turns one catalog request into a complete, tracked new-hire onboarding.**

![ServiceNow](https://img.shields.io/badge/ServiceNow-Scoped_App-62D84E?logo=servicenow&logoColor=white)
![Status](https://img.shields.io/badge/status-in_progress-orange)
![Sprints](https://img.shields.io/badge/sprints-3_of_3_complete-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

</div>

---

## Overview

Onboarding a new hire usually means chasing IT, HR and Facilities by email. This application replaces that with a single **New Hire Onboarding** catalog item. One request captures everything about the hire, gets manager approval, and automatically creates the right tasks for the right teams, with due dates worked out from the start date.

Built as a self-directed project on a ServiceNow Personal Developer Instance (PDI) to practise real ITSM patterns: scoped applications, Service Catalog, Flow Designer, scripting, ACLs and reporting.

## Project Status

| Sprint| Focus | Status |
|---|---|---|
| 1 | Foundation and catalog item | Complete |
| 2 | Automation with Flow Designer | Complete |
| 3 | Reporting and publish | Complete |

Full task list: [docs/sprint-plan.md](docs/sprint-plan.md) | History: [CHANGELOG.md](CHANGELOG.md)

## How It Works

```mermaid
flowchart LR
    A[New Hire Onboarding catalog item] --> B{Manager approval}
    B -- Rejected --> C[Notify requester]
    B -- Approved --> D[Look up task templates]
    D --> E[Create tasks for IT, HR and Facilities]
    E --> F[Notify manager and groups]
    E --> G[Laptop task closed]
    G --> H[Create Employee Asset record]
    E --> I[Last task closed]
    I --> J[Request closes]
```

1. The requester submits the catalog item with the hire's department, start date, manager and equipment needs.
2. The hiring manager approves or rejects the request.
3. On approval, a flow reads the **Onboarding Task Template** table and creates one catalog task per matching template, assigned to the right group.
4. Due dates are calculated from the start date and each template's lead time.
5. Closing the laptop task records the device in **Employee Asset**.
6. Closing the last open task closes the request.

Step-by-step detail, scripts and test results: [docs/flow.md](docs/flow.md).

## Request Form

The **New Hire Onboarding** catalog item captures 11 variables ([details](docs/data-model.md#catalog-variables-new-hire-onboarding)).

- **Conditional fields:** three Catalog UI Policies show and require Laptop Type, Software List or Office Location only when the matching Yes/No answer is Yes.
- **Date validation:** a Catalog Client Script clears a start date in the past.
- **One source for departments:** the Department dropdown reads its choices from the Department field on the Onboarding Task Template table, so the form and the task rules cannot drift apart. `all` exists there to mean every department, so it is hidden on load and rejected on submit.

Scripts are in [scripts/client-scripts](scripts/client-scripts/).

## Automation

Built in Sprint 2 ([full walkthrough](docs/flow.md)):

- **Approval:** the hiring manager approves or rejects. A rejection closes the request and emails the requester the reason.
- **Task generation:** the flow reads the Onboarding Task Template table, loops over the rows for the requested department, and creates a catalog task for each one that applies to the answers given. An Engineering request with laptop, software and desk all Yes creates 8 tasks; with all No it creates 5.
- **Due dates:** a Script Include, called through a small custom flow action, sets each task's due date to the start date minus the template's lead time.
- **Notifications:** one email to the hiring manager, and one per task to its assignment group.
- **Asset record:** a Business Rule creates an Employee Asset record when the "Issue Laptop" task closes.
- **Completion:** a second Business Rule closes the request when its last task closes.

## Data Model

Scope: `x_1901336_employ_0`

| Table | Purpose |
|---|---|
| **Employee Asset** | Equipment issued to a new hire (asset type, serial number, status, linked request) |
| **Onboarding Task Template** | Rules that drive task creation: department, task, assigned group, lead time, and when it applies |
| **Software Option** | Software choices shown to the requester in the catalog form |

Field-level details and the entity diagram are in [docs/data-model.md](docs/data-model.md).

## Tech Stack

ServiceNow PDI | Scoped application (Studio) | Service Catalog | Catalog UI Policies and Client Scripts | Flow Designer | Script Includes | Business Rules | Scheduled Jobs | ACLs and Roles | Reports and Dashboards | Update Sets

## Repository Structure

```
servicenow-employee-onboarding/
├── README.md
├── CHANGELOG.md
├── LICENSE
├── docs/
│   ├── data-model.md        Tables, fields, choice values, relationships
│   ├── flow.md              Flow steps, scripts, test results
│   ├── sprint-plan.md       Sprint-by-sprint task checklist
│   └── screenshots/         Build screenshots, added each sprint
├── seed-data/
│   ├── onboarding_task_templates.csv
│   └── software_options.csv
├── scripts/
│   ├── client-scripts/      Catalog form validation
│   ├── script-includes/     OnboardingUtils.js
│   ├── flow-actions/        calculate-task-due-date.js
│   ├── business-rules/      create-employee-asset.js, close-ritm-on-last-task.js
│   └── README.md
└── update-sets/             Exported per sprint (sprint-1.xml, sprint-2.xml, ...)
```

## Getting Started

1. Get a free PDI from [developer.servicenow.com](https://developer.servicenow.com).
2. In the PDI, go to **System Update Sets > Retrieved Update Sets > Import Update Set from XML**, import each file from [update-sets/](update-sets/) in sprint order, then **Preview** and **Commit**.
3. Create the groups **IT Support**, **HR Operations** and **Facilities_Employee**, and add yourself as a member.
4. Load the [seed data](seed-data/). Update sets carry configuration only, not records.
5. Give the hiring manager you test with the `approver_user` role so they can see **My Approvals**, and put an email address on the three groups and the manager.
6. Open the **New Hire Onboarding** item in the Service Portal and submit a request.

More detail on exporting and importing: [update-sets/README.md](update-sets/README.md).

## Seed Data

| File | Rows | Contents |
|---|---|---|
| [onboarding_task_templates.csv](seed-data/onboarding_task_templates.csv) | 11 | Onboarding tasks by department and condition |
| [software_options.csv](seed-data/software_options.csv) | 6 | Software offered in the catalog form |

## Roadmap

- [x] Scoped application and data model (Sprint 1)
- [x] Seed data for task templates and software options (Sprint 1)
- [x] Catalog item with variables, UI policies and date validation (Sprint 1)
- [x] Approval, task creation and notifications in Flow Designer (Sprint 2)
- [x] Script Include for due dates, asset record creation, request closure (Sprint 2)
- [x] Reports and Platform Analytics dashboard (Sprint 3)
- [ ] Overdue reminders, roles and ACLs (deferred)
- [ ] Offboarding catalog item (stretch)
- [ ] Incident management with SLA and AI-assisted routing (second project)

## Screenshots

### Sprint 1: data model and seed data

| Employee Asset | Onboarding Task Template |
|---|---|
| ![Employee Asset table](docs/screenshots/sprint1-table-employee-asset.png) | ![Onboarding Task Template table](docs/screenshots/sprint1-table-onboarding-task-template.png) |

| Software Option | Seeded task templates |
|---|---|
| ![Software Option table](docs/screenshots/sprint1-table-software-option.png) | ![Seeded task templates](docs/screenshots/sprint1-seed-task-templates.png) |

### Sprint 1: catalog item

| Request form | Request submitted |
|---|---|
| ![Catalog form](docs/screenshots/sprint1-catalog-form.png) | ![Order submitted](docs/screenshots/sprint1-order-submitted.png) |

![Requested item with captured variables](docs/screenshots/sprint1-ritm-variables.png)

### Sprint 2: automation

![Flow canvas](docs/screenshots/sprint2-flow-canvas.png)

| Generated tasks with groups and due dates | Employee Asset created on laptop task close |
|---|---|
| ![Catalog tasks](docs/screenshots/sprint2-catalog-tasks.png) | ![Employee Asset](docs/screenshots/sprint2-employee-asset.png) |

![Completed flow execution](docs/screenshots/sprint2-flow-execution.png)

More are added to [docs/screenshots/](docs/screenshots/) as each sprint completes. 
### Sprint 3: dashboard

![Employee Onboarding dashboard](docs/screenshots/sprint3-dashboard.png)

Pending onboardings, completed onboardings, and tasks by assignment group stacked by state.

## Author

**Aditya Joshi**, Pune, India

## License

Released under the [MIT License](LICENSE).
