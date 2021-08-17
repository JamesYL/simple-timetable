import { create, DayOfWeek, TimetableContent } from "../../Timetable";

describe("General timetable methods", () => {
  test("Adding and removing from timetable", () => {
    const timetable = create().add(content1, content1, content2);
    expect(timetable.getTimetable()).toHaveLength(2);
    timetable.remove(content1);
    expect(timetable.getTimetable()).toHaveLength(1);
    timetable.remove(content2);
    expect(timetable.getTimetable()).toHaveLength(0);
    timetable.remove(content1, content2);
    expect(timetable.getTimetable()).toHaveLength(0);
  });
  test("Clear timetable", () => {
    const timetable = create();
    timetable.add(content1, content1, content2).clear();
    expect(timetable.getTimetable()).toHaveLength(0);
    timetable.add(content1, content1, content2).clear();
    expect(timetable.getTimetable()).toHaveLength(0);
  });
  test("Has weekend", () => {
    const timetable = create().add(content1, content2);
    expect(timetable.hasWeekend()).toBe(false);
    for (let i = 0; i <= 6; i++) {
      const content: TimetableContent = {
        id: `has weekend ${i}`,
        dayOfWeek: i as DayOfWeek,
        start: [2, 50],
        end: [5, 20],
      };
      timetable.add(content);
      if (i <= 4) {
        expect(timetable.hasWeekend()).toBe(false);
      } else {
        expect(timetable.hasWeekend()).toBe(true);
      }
      timetable.remove(content);
    }
  });
  test("Timetable correct order", () => {
    const tuesday: TimetableContent = {
      id: "tuesday",
      dayOfWeek: 1,
      start: [2, 50],
      end: [5, 20],
    };
    const normal: TimetableContent = {
      id: "normal",
      dayOfWeek: 0,
      start: [2, 50],
      end: [5, 20],
    };
    const normalCpy: TimetableContent = {
      id: "normalCpy",
      dayOfWeek: 0,
      start: [2, 50],
      end: [5, 20],
    };
    const biggerEndTime: TimetableContent = {
      id: "biggerEndTime",
      dayOfWeek: 0,
      start: [2, 50],
      end: [5, 30],
    };
    const biggerStartTime: TimetableContent = {
      id: "biggerStartTime",
      dayOfWeek: 0,
      start: [2, 55],
      end: [5, 10],
    };

    let timetable = create().add(tuesday, normalCpy, normal);
    expect(timetable.getTimetable()).toEqual([normalCpy, normal, tuesday]);
    timetable.clear().add(normal, biggerEndTime, biggerStartTime);
    expect(timetable.getTimetable()).toEqual([
      normal,
      biggerEndTime,
      biggerStartTime,
    ]);
    timetable.clear().add(biggerEndTime, biggerStartTime, normal);
    expect(timetable.getTimetable()).toEqual([
      normal,
      biggerEndTime,
      biggerStartTime,
    ]);
  });
});

const content1: TimetableContent = {
  id: "id",
  dayOfWeek: 0,
  start: [2, 50],
  end: [5, 20],
};
const content2: TimetableContent = {
  id: "id2",
  dayOfWeek: 0,
  start: [2, 50],
  end: [5, 20],
};
