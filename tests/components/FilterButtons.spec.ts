import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import FilterTabs from "~/components/FilterTabs.vue";
import type { Filter } from "@/types/todo";

describe("FilterTabs.vue", () => {
  it("renders all filter buttons", () => {
    const wrapper = mount(FilterTabs, {
      props: {
        modelValue: "all",
      },
    });

    const buttons = wrapper.findAll("button");
    const expectedFilters: Filter[] = ["all", "completed", "pending"];

    expect(buttons).toHaveLength(expectedFilters.length);

    expectedFilters.forEach((filter, index) => {
      expect(buttons[index].text().toLowerCase()).toBe(filter);
    });
  });

  it("applies active style to selected filter", () => {
    const wrapper = mount(FilterTabs, {
      props: {
        modelValue: "completed",
      },
    });

    const activeButton = wrapper.find("button.bg-blue-500");
    expect(activeButton.exists()).toBe(true);
    expect(activeButton.text().toLowerCase()).toBe("completed");
  });

  it("emits update:modelValue when button is clicked", async () => {
    const wrapper = mount(FilterTabs, {
      props: {
        modelValue: "all",
      },
    });

    const pendingButton = wrapper
      .findAll("button")
      .find((b) => b.text().toLowerCase() === "pending");
    expect(pendingButton).toBeDefined();

    await pendingButton!.trigger("click");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["pending"]);
  });
});
