/**
 * Catalog Client Script: Reject All department
 *
 * Catalog item : New Hire Onboarding
 * Type         : onSubmit
 * UI Type      : All
 *
 * Safety net for hide-all-department-option.js: even if the dropdown still
 * offers "All", the request cannot be submitted with it.
 */
function onSubmit() {
    var dept = (g_form.getValue('department') || '').toLowerCase();

    if (dept === 'all') {
        g_form.showFieldMsg('department', "Choose the new hire's actual department.", 'error');
        return false;
    }
}
