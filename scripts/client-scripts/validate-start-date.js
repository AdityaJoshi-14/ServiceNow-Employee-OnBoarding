/**
 * Catalog Client Script: Validate start date
 *
 * Catalog item  : New Hire Onboarding
 * Type          : onChange
 * Variable name : start_date
 * UI Type       : All
 *
 * Blocks start dates in the past. Compares yyyy-MM-dd strings, which sort the
 * same way dates do, so there is no date parsing or timezone handling to go
 * wrong. Assumes the instance date format is yyyy-MM-dd.
 */
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

    var d = new Date();
    var today = d.getFullYear() + '-' +
                ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
                ('0' + d.getDate()).slice(-2);

    if (newValue < today) {
        g_form.clearValue('start_date');
        g_form.showFieldMsg('start_date', 'Start date cannot be in the past.', 'error');
    }
}
