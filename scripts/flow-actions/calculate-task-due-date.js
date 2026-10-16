/**
 * Flow Action: Calculate Task Due Date
 *
 * Application : Employee Onboarding
 * Step        : Script step (the only step)
 *
 * Action inputs     : start_date (Date), days_before (Integer)
 * Step inputs       : start_date -> action start_date, days_before -> action days_before
 * Step output       : due_date (String)
 * Action output     : due_date (Date/Time), mapped from the step output
 *
 * Flow Designer cannot call a Script Include directly, so this action wraps
 * OnboardingUtils.getDueDate(). The flow calls it inside the loop, before
 * Create Catalog Task, and maps the output to the task's Due date.
 */
(function execute(inputs, outputs) {
    var utils = new x_1901336_employ_0.OnboardingUtils();
    outputs.due_date = utils.getDueDate(String(inputs.start_date).substring(0, 10), inputs.days_before);
})(inputs, outputs);
