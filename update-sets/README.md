# Update Sets

One update set per sprint, exported from the PDI once the sprint is finished.

| File | Sprint | Contents | Status |
|---|---|---|---|
| `sprint-1.xml` | 1 | Scoped app, three tables, catalog item, UI policies, client scripts | Complete |
| `sprint-2.xml` | 2 | Flow, flow action, Script Include, Business Rules, cross-scope privileges | Complete |
| `sprint-3.xml` | 3 | Scheduled job, roles and ACLs, reports, dashboard | Planned |

## Exporting a sprint

1. Check that the application picker shows **Employee Onboarding**.
2. Open **System Update Sets > Local Update Sets** and open `Onboarding - Sprint N`.
3. Review **Customer Updates**. Every row should belong to the Employee Onboarding scope; move any strays that landed in a Default update set.
4. Set **State** to **Complete**.
5. Use the related link **Export Update Set** to download the XML, rename it `sprint-N.xml`, and save it in this folder.

## Importing

1. On the target instance, go to **System Update Sets > Retrieved Update Sets** and choose **Import Update Set from XML**.
2. Import in sprint order: 1, then 2, then 3.
3. The Sprint 2 set contains the flow and cross-scope privilege records. Open each retrieved set, run **Preview Update Set**, resolve any problems, then **Commit Update Set**.
4. Load the [seed data](../seed-data/), which update sets do not carry.
