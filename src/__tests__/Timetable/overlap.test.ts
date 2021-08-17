import { create, DayOfWeek, TimetableContent } from "../../Timetable";

describe("Timetable overlap", () => {
  test("Same id", () => {
    const timetable = create();
    timetable.add(content1);
    expect(timetable.isOverlap(content1)).toBe(false);
  });
  test("Different week day", () => {
    const timetable = create();
    timetable.add(content1);
    for (let i = 1; i <= 6; i++) {
      expect(
        timetable.isOverlap({
          ...content1,
          dayOfWeek: i as DayOfWeek,
          id: `${content1.id + i}`,
        })
      ).toBe(false);
    }
  });
  test("Same content different id", () => {
    const timetable = create();
    timetable.add(content1);
    expect(timetable.isOverlap({ ...content1, id: "id2" })).toBe(true);
  });
  test("Completely encompasses", () => {
    const timetable = create();
    timetable.add(content1);
    expect(
      timetable.isOverlap({
        ...content1,
        id: "id2",
        start: [0, 0],
        end: [6, 30],
      })
    ).toBe(true);
  });
  test("Only inside", () => {
    const timetable = create();
    timetable.add(content1);
    expect(
      timetable.isOverlap({
        ...content1,
        id: "id2",
        start: [3, 0],
        end: [4, 0],
      })
    ).toBe(true);
  });
  test("Beginning and ending overlap only", () => {
    const timetable = create();
    timetable.add(content1);
    expect(
      timetable.isOverlap({
        ...content1,
        id: "id2",
        start: [2, 0],
        end: [3, 0],
      })
    ).toBe(true);
    expect(
      timetable.isOverlap({
        ...content1,
        id: "id2",
        start: [5, 0],
        end: [5, 30],
      })
    ).toBe(true);
  });

  test("Touches but no overlap", () => {
    const timetable = create();
    timetable.add(content1);
    expect(
      timetable.isOverlap({
        ...content1,
        id: "id2",
        start: [2, 30],
        end: [2, 50],
      })
    ).toBe(false);
    expect(
      timetable.isOverlap({
        ...content1,
        id: "id2",
        start: [5, 20],
        end: [5, 30],
      })
    ).toBe(false);
  });
  test("Overlap with two items", () => {
    const timetable = create();
    timetable.add(content1);
    const content2: TimetableContent = {
      id: "id2",
      dayOfWeek: 0,
      start: [5, 40],
      end: [6, 0],
    };
    expect(timetable.isOverlap(content2)).toBe(false);
    timetable.add(content2);
    const doubleOverlap: TimetableContent = {
      id: "id3",
      dayOfWeek: 0,
      start: [5, 10],
      end: [6, 0],
    };
    const beginningOverlap: TimetableContent = {
      id: "id3",
      dayOfWeek: 0,
      start: [5, 10],
      end: [5, 30],
    };
    const endingOverlap: TimetableContent = {
      id: "id3",
      dayOfWeek: 0,
      start: [5, 30],
      end: [5, 50],
    };
    expect(timetable.isOverlap(doubleOverlap)).toBe(true);
    expect(timetable.isOverlap(beginningOverlap)).toBe(true);
    expect(timetable.isOverlap(endingOverlap)).toBe(true);
  });
});
const content1: TimetableContent = {
  id: "id",
  dayOfWeek: 0,
  start: [2, 50],
  end: [5, 20],
};
