/**
 * Business Rule: Close RITM when all onboarding tasks close
 *
 * Table             : Catalog Task [sc_task]
 * When              : after
 * Insert / Update   : Update only
 * Filter conditions : State changes to Closed Complete
 * Advanced          : ticked
 *
 * Closes the requested item once its last open catalog task is closed, so
 * completion time can be reported.
 */
(function executeRule(current, previous /*null when async*/ ) {
    var open = new GlideRecord('sc_task');
    open.addQuery('request_item', current.getValue('request_item'));
    open.addActiveQuery();
    open.setLimit(1);
    open.query();
    if (open.hasNext()) return; // other tasks still open

    var ritm = current.request_item.getRefRecord();
    if (ritm.isValidRecord() && ritm.active) {
        ritm.setValue('state', 3); // Closed Complete
        ritm.update();
    }
})(current, previous);
