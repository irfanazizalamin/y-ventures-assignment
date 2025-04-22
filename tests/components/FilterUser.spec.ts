import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FilterUser from "~/components/FilterUser.vue";

describe("FilterUser.vue", () => {
  it("renders the select element with 11 options (1 null + 10 users)", () => {
    const wrapper = mount(FilterUser, {
      props: {
        modelValue: null,
        userIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });

    const select = wrapper.find("select");
    const options = select.findAll("option");
    expect(options).toHaveLength(11);
    expect(options[0].text()).toBe("All Users");
    expect(options[1].text()).toBe("User 1");
    expect(options[10].text()).toBe("User 10");
  });

  it("emits correct value on change", async () => {
    const wrapper = mount(FilterUser, {
      props: {
        modelValue: null,
        userIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });

    const select = wrapper.find("select");

    // simulate selecting User 3
    await select.setValue("3");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([3]);

    // simulate selecting "All Users" (null)
    await select.setValue("null");
    expect(wrapper.emitted("update:modelValue")![1]).toEqual([null]);
  });

  it("sets correct initial selected value", () => {
    const wrapper = mount(FilterUser, {
      props: {
        modelValue: 5,
        userIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    });

    const select = wrapper.find("select");
    expect((select.element as HTMLSelectElement).value).toBe("5");
  });
});
