# Catalog Client Scripts

Client-side scripts on the **New Hire Onboarding** catalog item. Each file starts with a header listing the settings to use when creating the script record in ServiceNow.

| Script | Type | Variable | Purpose |
|---|---|---|---|
| [validate-start-date.js](validate-start-date.js) | onChange | `start_date` | Clears a start date in the past and shows an error |
| [hide-all-department-option.js](hide-all-department-option.js) | onLoad | | Removes the "All" option from the Department dropdown |
| [reject-all-department.js](reject-all-department.js) | onSubmit | | Blocks submission if Department is still "All" |

The three Catalog UI Policies that show and require Laptop Type, Software List and Office Location need no code and are captured in the update set.
