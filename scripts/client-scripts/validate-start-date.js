/**
 * Catalog Client Script: Validate start date
 *
 * Catalog item : New Hire Onboarding
 * Type         : onChange
 * Variable name: start_date
 * Applies on   : Catalog Item view, Service Portal
 *
 * Blocks start dates in the past. Assumes the instance's default
 * yyyy-MM-dd date format; use a GlideAjax check if your format differs.
 */
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

    var chosen = new Date(newValue);
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosen < today) {
        g_form.clearValue('start_date');
        g_form.showFieldMsg('start_date', 'Start date cannot be in the past.', 'error');
    }
}
