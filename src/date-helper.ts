export abstract class DateHelper {
  public static cloneDate(date: Date): Date {
    return new Date(date.getTime())
  }

  public static addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days)

    return date
  }
}

const now = new Date()
const weekAfter = DateHelper.addDays(DateHelper.cloneDate(now), 7)
