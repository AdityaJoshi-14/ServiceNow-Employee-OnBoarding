# Scripts

Every script in the application, kept here so it can be read without opening the instance. Each file starts with a header listing the settings to use when creating the record in ServiceNow. All of it is also captured in the update sets.

| Folder | Script | Purpose |
|---|---|---|
| [client-scripts](client-scripts/) | validate-start-date.js, hide-all-department-option.js, reject-all-department.js | Catalog form validation (Sprint 1) |
| [script-includes](script-includes/) | [OnboardingUtils.js](script-includes/OnboardingUtils.js) | `getDueDate()`: start date minus lead time |
| [flow-actions](flow-actions/) | [calculate-task-due-date.js](flow-actions/calculate-task-due-date.js) | Flow action that wraps the Script Include |
| [business-rules](business-rules/) | [create-employee-asset.js](business-rules/create-employee-asset.js) | Creates the Employee Asset record when "Issue Laptop" closes |
| | [close-ritm-on-last-task.js](business-rules/close-ritm-on-last-task.js) | Closes the request when its last task closes |
