import { filterArray } from "../../../src/server/utils/filters";

describe("Filters", () => {
  let filter, actual;

  describe("Filter Array", () => {
    describe("given filter has exists", () => {
      describe("when exists is true", () => {
        beforeEach(() => {
          filter = {
            exists: true,
          };
        });

        test("should return true if the value exists", () => {
          actual = filterArray(["stuff"], filter);

          expect(actual).toBeTruthy();
        });

        test("should return false if the value does not exist", () => {
          actual = filterArray(null, filter);

          expect(actual).toBeFalsy();
        });
      });

      describe("when exists is false", () => {
        beforeEach(() => {
          filter = {
            exists: false,
          };
        });

        test("should return true if the value exists", () => {
          actual = filterArray(["stuff"], filter);

          expect(actual).toBeFalsy();
        });

        test("should return false if the value does not exist", () => {
          actual = filterArray(null, filter);

          expect(actual).toBeTruthy();
        });
      });
    });

    describe("given filter has in", () => {
      beforeEach(() => {
        filter = {
          in: ["thing"],
        };
      });

      test("should return true if the field is in the value", () => {
        actual = filterArray(["potato", "thing"], filter);

        expect(actual).toBeTruthy();
      });

      test("should return false if the the field is not in the value", () => {
        actual = filterArray(["stuff", "potato"], filter);

        expect(actual).toBeFalsy();
      });
    });
  });
});
