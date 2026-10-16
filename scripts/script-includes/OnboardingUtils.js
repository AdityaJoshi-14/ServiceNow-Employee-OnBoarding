/**
 * Script Include: OnboardingUtils
 *
 * Name            : OnboardingUtils
 * API name        : x_1901336_employ_0.OnboardingUtils
 * Accessible from : This application scope only
 * Glide AJAX enabled (client callable) : unticked
 *
 * Called by the "Calculate Task Due Date" flow action.
 */
var OnboardingUtils = Class.create();
OnboardingUtils.prototype = {
    initialize: function() {},

    /**
     * Due date = start date minus the template's lead time.
     * If that date has already passed, the task is due now.
     * @param {string} startDate  'yyyy-MM-dd' from the catalog Date variable
     * @param {number} daysBefore Due Days Before Start from the template
     * @returns {string} 'yyyy-MM-dd HH:mm:ss' (internal Date/Time value)
     */
    getDueDate: function(startDate, daysBefore) {
        if (!startDate) return '';
        var days = parseInt(daysBefore, 10) || 0;

        // Noon UTC keeps the calendar date the same in IST and US time zones
        var due = new GlideDateTime(startDate + ' 12:00:00');
        due.addDaysUTC(-days);

        var now = new GlideDateTime();
        if (due.compareTo(now) < 0) due = now;

        return due.getValue();
    },

    type: 'OnboardingUtils'
};
