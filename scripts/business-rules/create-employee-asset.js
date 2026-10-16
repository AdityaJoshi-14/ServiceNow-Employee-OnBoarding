/**
 * Business Rule: Create Employee Asset on laptop task close
 *
 * Table             : Catalog Task [sc_task]
 * When              : after
 * Insert / Update   : Update only
 * Filter conditions : State changes to Closed Complete
 * Advanced          : ticked
 *
 * When the "Issue Laptop" task closes, records the device in Employee Asset
 * (Laptop, Issued, today's date) and links it to the request. The Employee
 * reference is filled when a user with the same name as the form's Employee
 * Name exists. A duplicate check stops a reopened and re-closed task from
 * creating a second record.
 */
(function executeRule(current, previous /*null when async*/) {
    // Choice values as stored on the Employee Asset table
    var ASSET_LAPTOP = 'lp';
    var STATUS_ISSUED = 'is';

    if (current.short_description.toString().toLowerCase() != 'issue laptop') return;

    var ritm = current.request_item.getRefRecord();
    if (!ritm.isValidRecord()) return;

    // Skip if a laptop asset already exists for this request (task reopened and closed again)
    var dup = new GlideRecord('x_1901336_employ_0_employee_asset');
    dup.addQuery('onboarding_request', ritm.getUniqueValue());
    dup.addQuery('asset_type', ASSET_LAPTOP);
    dup.setLimit(1);
    dup.query();
    if (dup.hasNext()) return;

    var asset = new GlideRecord('x_1901336_employ_0_employee_asset');
    asset.initialize();
    asset.setValue('asset_type', ASSET_LAPTOP);
    asset.setValue('status', STATUS_ISSUED);
    asset.setValue('issued_date', new GlideDateTime().getValue().substring(0, 10));
    asset.setValue('onboarding_request', ritm.getUniqueValue());

    // Link the new hire if a user with that name exists
    var name = ritm.variables.employee_name.toString();
    var user = new GlideRecord('sys_user');
    user.addQuery('name', name);
    user.setLimit(1);
    user.query();
    if (user.next()) asset.setValue('employee', user.getUniqueValue());

    asset.insert();
})(current, previous);
