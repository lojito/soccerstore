import { renderHook } from "@testing-library/react";
import useAuthLocalStorage from "../useAuthLocalStorage";

describe("useAuthLocalStorage", () => {
  it("should set the auth items in the local storage", () => {
    const authItems = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpdmFub2ppdG9AZ21haWwuY29tIiwidXNlcklkIjoiNjM2MDQ4YWY4MGQ1NThkMjRkNTYyNjVlIiwiaWF0IjoxNjY5MzYyMDQxLCJleHAiOjE2NjkzNjU2NDF9.GsPpPfBlyii1QhtexcuLV7MPueYZnJLLB7O4sz4H-Ik",
      name: "User",
      expirationDate: "2022-11-25T08:40:41.645Z",
      userId: "636048af80d558d24d56265e",
    };
    const items: string[] = [];
    const setItem = vi.fn((item: string) => {
      items.push(item);
    });
    const spySetItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(setItem);
    const { result } = renderHook(() => useAuthLocalStorage());

    result.current.setAuthItems(authItems);

    expect(spySetItem).toHaveBeenCalledTimes(4);
    expect(items.length).toBe(4);
    expect(items).toContain("token");
    expect(items).toContain("expirationDate");
    expect(items).toContain("userId");
    expect(items).toContain("name");
  });

  it("should get the auth items from the local storage", () => {
    const items: string[] = [];
    const getItem = vi.fn((item: string) => {
      items.push(item);
      return item;
    });
    const spyGetItem = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(getItem);
    const { result } = renderHook(() => useAuthLocalStorage());

    result.current.getAuthItems();

    expect(spyGetItem).toHaveBeenCalledTimes(4);
    expect(items.length).toBe(4);
    expect(items).toContain("token");
    expect(items).toContain("expirationDate");
    expect(items).toContain("userId");
    expect(items).toContain("name");
  });

  it("should remove the auth items from the local storage", () => {
    const items: string[] = [];
    const removeItem = vi.fn((item) => {
      items.push(item);
    });
    const spyRemoveItem = vi
      .spyOn(Storage.prototype, "removeItem")
      .mockImplementation(removeItem);
    const { result } = renderHook(() => useAuthLocalStorage());

    result.current.removeAuthItems();

    expect(spyRemoveItem).toHaveBeenCalledTimes(4);
    expect(items.length).toBe(4);
    expect(items).toContain("token");
    expect(items).toContain("expirationDate");
    expect(items).toContain("userId");
    expect(items).toContain("name");
  });
});
