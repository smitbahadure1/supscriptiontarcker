import { addWeeks, addMonths, addYears, parseISO, formatISO } from 'date-fns';

export const calculateNextRenewal = (startDate, cycle) => {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const now = new Date();

    let nextDate = start;

    // Simple loop to find next date in future
    // In a real app, you'd calculate strict intervals to avoid drift
    while (nextDate < now) {
        switch (cycle) {
            case 'Weekly':
                nextDate = addWeeks(nextDate, 1);
                break;
            case 'Bi-weekly':
                nextDate = addWeeks(nextDate, 2);
                break;
            case 'Monthly':
                nextDate = addMonths(nextDate, 1);
                break;
            case 'Quarterly':
                nextDate = addMonths(nextDate, 3);
                break;
            case 'Semi-yearly':
                nextDate = addMonths(nextDate, 6);
                break;
            case 'Yearly':
                nextDate = addYears(nextDate, 1);
                break;
            default: // Monthly default
                nextDate = addMonths(nextDate, 1);
        }
    }

    return formatISO(nextDate);
};

export const getMonthlyCost = (amount, cycle) => {
    const amt = parseFloat(amount);
    if (isNaN(amt)) return 0;

    switch (cycle) {
        case 'Weekly':
            return amt * 4.33;
        case 'Bi-weekly':
            return amt * 2.165;
        case 'Monthly':
            return amt;
        case 'Quarterly':
            return amt / 3;
        case 'Semi-yearly':
            return amt / 6;
        case 'Yearly':
            return amt / 12;
        default:
            return amt;
    }
};

export const doesSubscriptionRenewOn = (sub, targetDate) => {
    if (!sub || !sub.startDate || !targetDate) return false;

    // Normalize dates to start of day for comparison
    const start = typeof sub.startDate === 'string' ? parseISO(sub.startDate) : sub.startDate;
    // We need to check if targetDate hits the cycle relative to StartDate
    // IMPORTANT: precise cycle logic is complex (e.g. 31st of month). 
    // For this UI demo, we will check if the day of month matches for Monthly, etc.

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    const startObj = new Date(start);
    startObj.setHours(0, 0, 0, 0);

    if (target < startObj) return false;

    const diffTime = target.getTime() - startObj.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    switch (sub.billingCycle) {
        case 'Weekly':
            return diffDays % 7 === 0;
        case 'Bi-weekly':
            return diffDays % 14 === 0;
        case 'Monthly':
            // Simple check: Day of month matches?
            // Edge case: Start Jan 31, Target Feb 28? date-fns addMonths handles this, 
            // but simple DayofMonth matching will fail. 
            // Robust way: iterate from start until we hit or pass target. 
            // Since we only view one month, this iteration is cheap.
            let tempDate = new Date(startObj);
            while (tempDate < target) {
                tempDate = addMonths(tempDate, 1);
            }
            return tempDate.getTime() === target.getTime();

        case 'Quarterly':
            let qDate = new Date(startObj);
            while (qDate < target) {
                qDate = addMonths(qDate, 3);
            }
            return qDate.getTime() === target.getTime();

        case 'Yearly':
            let yDate = new Date(startObj);
            while (yDate < target) {
                yDate = addYears(yDate, 1);
            }
            return yDate.getTime() === target.getTime();

        default:
            // Default Monthly
            let defDate = new Date(startObj);
            while (defDate < target) {
                defDate = addMonths(defDate, 1);
            }
            return defDate.getTime() === target.getTime();
    }
};
