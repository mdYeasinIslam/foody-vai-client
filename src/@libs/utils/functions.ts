export class $$ {
  public static isNotEmpty(value: any): boolean {
    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === "object" && Object.keys(value).length === 0)
    );
  }
  public static toSafeArray(value: any): any[] {
    if (this.isNotEmpty(value)) {
      return value;
    }
    return [];
  }

  public static toCleanArray<T = any>(array: T[]): T[] {
    return array.filter((x) => this.isNotEmpty(x));
  }

  public static clearObjectValues(obj: { [key: string]: any }): any {
    if (this.isValidObject(obj)) {
      Object.keys(obj).forEach((key) => {
        obj[key] = null;
      });
    }
    return obj;
  }
  public static isValidObject(value: any): boolean {
    return typeof value === "object" && value !== null;
  }
}
