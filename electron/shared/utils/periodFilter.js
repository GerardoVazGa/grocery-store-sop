import { todayLocal } from "./dateUtils.js";

export function getPeriodFilter(period = "day", fieldTable = "sales") {
    const today = todayLocal()
    const field = `${fieldTable}.created_at`

    switch (period) {
        case "week":
            return `date(${field}) >= date('${today}', '-7 days')`
        case "month":
            return `strftime('%Y-%m', ${field}) = strftime('%Y-%m', '${today}')`
        case "day":
        default:
            return `date(${field}) = '${today}'`
    }
}