/**
 * Catalog Client Script: Hide All department option
 *
 * Catalog item : New Hire Onboarding
 * Type         : onLoad
 * UI Type      : All
 *
 * The Department choices are read from the Department field on the
 * Onboarding Task Template table, where "all" means "every department".
 * A new hire belongs to one department, so remove that option from the form.
 * Removing an option that is not present does nothing, so both spellings
 * are tried.
 */
function onLoad() {
    g_form.removeOption('department', 'all');
    g_form.removeOption('department', 'All');
}
