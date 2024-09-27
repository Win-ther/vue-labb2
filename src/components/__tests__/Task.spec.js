import {mount} from "@vue/test-utils";
import {describe, it, expect, beforeAll, afterEach, afterAll, vi} from "vitest";
import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";

import Task from "../Task.vue";

vi.mock('vue-router', () => ({
    resolve: vi.fn(),
    RouterLink: vi.fn(),
}));
describe("Task.vue", () => {
    const wrapper = mount(Task, {
        props: {
            task: {
                id: 1,
                name: "test",
                description: "test description",
                completedBy: "2024-09-26",
                done: false
            }
        }
    });
    const restHandlers = [
        http.put('http://localhost:5000/tasks/'+wrapper.vm.task.id, () => {
            return HttpResponse.json({
            },{status:200})
        })
    ];
    const server = setupServer(...restHandlers);
    beforeAll(() => server.listen({onUnhandledRequest: 'error'}));
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it("renders correctly", () => {
        expect(wrapper.text()).toContain('test');
        expect(wrapper.text()).toContain('test description');
        expect(wrapper.text()).toContain('2024-09-26');
    });
    it("Click on the task will change task.done to true. Which will update wrapper with 'Completed!' ", async() => {
        await wrapper.get("section").trigger("click");
        expect(wrapper.vm.task.done).toBe(true);
        expect(wrapper.text()).toContain('Completed!');
    })
})