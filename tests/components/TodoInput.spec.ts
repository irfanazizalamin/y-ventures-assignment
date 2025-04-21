import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoInput from "~/components/TodoInput.vue";

describe("TodoInput.vue", () => {
  it("renders input and textarea elements", () => {
    const wrapper = mount(TodoInput);
    const input = wrapper.find("input");
    const textarea = wrapper.find("textarea");
    const button = wrapper.find("button");

    expect(input.exists()).toBe(true);
    expect(textarea.exists()).toBe(true);
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Add");
  });

  it("emits submit event with input and description", async () => {
    const wrapper = mount(TodoInput);
    const input = wrapper.find("input");
    const textarea = wrapper.find("textarea");
    const button = wrapper.find("button");

    await input.setValue("Buy milk");
    await textarea.setValue("2 liters of fresh milk");
    await button.trigger("click");

    expect(wrapper.emitted("submit")).toBeTruthy();
    expect(wrapper.emitted("submit")![0]).toEqual([
      "Buy milk",
      "2 liters of fresh milk",
    ]);
  });

  it("does not emit if title is empty", async () => {
    const wrapper = mount(TodoInput);
    const button = wrapper.find("button");

    await button.trigger("click");

    expect(wrapper.emitted("submit")).toBeFalsy();
  });

  it("clears input and description after submit", async () => {
    const wrapper = mount(TodoInput);
    const input = wrapper.find("input");
    const textarea = wrapper.find("textarea");
    const button = wrapper.find("button");

    await input.setValue("Read book");
    await textarea.setValue("Chapter 3");
    await button.trigger("click");

    expect(input.element.value).toBe("");
    expect(textarea.element.value).toBe("");
  });
});
