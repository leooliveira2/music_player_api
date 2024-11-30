export class DateUtils {
  static getDateFromNow(days: number) {
    const today = new Date();
    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + days);
    return resultDate;
  }
}
