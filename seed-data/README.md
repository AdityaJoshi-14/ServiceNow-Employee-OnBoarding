# Seed Data

Update sets carry configuration (tables, catalog item, flows, scripts) but not records, so the data that drives the application lives here as CSV.

| File | Target table | Rows |
|---|---|---|
| `onboarding_task_templates.csv` | Onboarding Task Template (`x_1901336_employ_0_onboarding_task_template`) | 11 |
| `software_options.csv` | Software Option (`x_1901336_employ_0_software_option`) | 6 |

## Notes

- **Choice columns** (`department`, `applies_when`) use the choice **values**, not the labels: `all`, `engineering`, `always`, `laptop_needed`, and so on. See [docs/data-model.md](../docs/data-model.md).
- **`assigned_group`** is matched by group name. Create the groups **IT Support**, **HR Operations** and **Facilities_Employee** first, otherwise the reference will not resolve.
- 11 and 6 rows are small enough to load by hand with the list editor, or use **System Import Sets > Load Data** and map to the target table.
