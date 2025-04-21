import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoItem from "~/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  const sampleTodo = {
    id: "1",
    userId: 1,
    title: "Complete the assignment",
    body: "To get hired 🙌",
    completed: false,
    createdAt: Date.now(),
  };

  it("renders the todo title and body correctly", () => {
    const wrapper = mount(TodoItem, {
      props: { todo: sampleTodo },
    });

    expect(wrapper.text()).toContain(sampleTodo.title);
    expect(wrapper.text()).toContain(sampleTodo.body);
  });

  it("checks the checkbox if the todo is marked as completed", () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          ...sampleTodo,
          completed: true,
        },
      },
    });

    const checkbox = wrapper.get('input[type="checkbox"]');
    expect((checkbox.element as HTMLInputElement).checked).toBe(true);
  });

  it('emits a "toggle" event with the todo id when the checkbox is changed', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: sampleTodo },
    });

    await wrapper.get('input[type="checkbox"]').trigger("change");

    expect(wrapper.emitted("toggle")).toBeTruthy();
    expect(wrapper.emitted("toggle")![0]).toEqual([sampleTodo.id]);
  });

  it('emits a "remove" event with the todo id when the delete button is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: sampleTodo },
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")![0]).toEqual([sampleTodo.id]);
  });

  it('applies "line-through" style when the todo is completed', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: {
          ...sampleTodo,
          completed: true,
        },
      },
    });

    const title = wrapper.get("h2");
    const body = wrapper.get("p");

    expect(title.classes()).toContain("line-through");
    expect(body.classes()).toContain("line-through");
  });
});
