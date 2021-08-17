class Timetable<Content extends TimetableContent> {
  private timetable: Content[][];
  private ids: Set<string>;
  constructor() {
    this.timetable = new Array(7 * 24).fill(0).map(() => []);
    this.ids = new Set();
  }
  public clear(): Timetable<Content> {
    this.timetable = this.timetable.map(() => []);
    this.ids.clear();
    return this;
  }
  public add(...contents: Content[]): Timetable<Content> {
    for (const content of contents) {
      if (this.ids.has(content.id)) continue;
      this.ids.add(content.id);
      const [startIndex, endIndex] = this.getIndex(content);
      for (let i = startIndex; i <= endIndex; i++) {
        this.timetable[i].push(content);
      }
    }
    return this;
  }
  public remove(...contents: Content[]): Timetable<Content> {
    for (const content of contents) {
      if (!this.ids.has(content.id)) continue;
      this.ids.delete(content.id);
      const [startIndex, endIndex] = this.getIndex(content);
      for (let i = startIndex; i <= endIndex; i++) {
        this.timetable[i] = this.timetable[i].filter(
          (item) => item.id !== content.id
        );
      }
    }
    return this;
  }
  public getTimetable(): Content[] {
    const timetableResult: Content[] = [];
    const alreadyDiscovered = new Set<string>();
    for (const timePeriod of this.timetable) {
      timePeriod.sort((a, b) => {
        const [startA, endA] = this.convertToMinutes(a);
        const [startB, endB] = this.convertToMinutes(b);
        if (startA === startB) {
          if (endA === endB) return 0;
          return endA < endB ? -1 : 1;
        }
        return startA < startB ? -1 : 1;
      });
      for (const content of timePeriod) {
        if (!alreadyDiscovered.has(content.id)) timetableResult.push(content);
        alreadyDiscovered.add(content.id);
      }
    }
    return timetableResult;
  }
  public hasWeekend(): boolean {
    for (let i = 120; i <= 167; i++) {
      if (this.timetable[i].length > 0) return true;
    }
    return false;
  }
  public isOverlap(content: Content): boolean {
    const [start, end] = this.convertToMinutes(content);
    const [startIndex, endIndex] = this.getIndex(content);
    for (let i = startIndex; i <= endIndex; i++) {
      for (const innerContent of this.timetable[i]) {
        if (innerContent.id === content.id) continue;
        const [innerStart, innerEnd] = this.convertToMinutes(innerContent);
        if (start < innerEnd && end > innerStart) return true;
      }
    }
    return false;
  }
  private getIndex(content: Content): [number, number] {
    const dayOfWeek = content.dayOfWeek;
    const [startHour] = content.start;
    const [endHour] = content.end;
    return [dayOfWeek * 24 + startHour, dayOfWeek * 24 + endHour];
  }
  private convertToMinutes(content: Content): [number, number] {
    const [startHour, startMinute] = content.start;
    const [endHour, endMinute] = content.end;
    return [
      content.dayOfWeek * 24 * 60 + startHour * 60 + startMinute,
      content.dayOfWeek * 24 * 60 + endHour * 60 + endMinute,
    ];
  }
}
export const create = <
  Content extends TimetableContent
>(): Timetable<Content> => new Timetable<Content>();
export interface TimetableContent {
  /** Must be unique */
  readonly id: string;
  readonly dayOfWeek: DayOfWeek;
  readonly start: readonly [Hour, Minute];
  readonly end: readonly [Hour, Minute];
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;
export type Minute =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59;
