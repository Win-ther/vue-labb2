import {mount} from "@vue/test-utils";
import {describe, it, expect, beforeAll, afterEach, afterAll, vi, beforeEach} from "vitest";
import {setupServer} from "msw/node";
import {http, HttpResponse} from "msw";

import Tasks from "../Tasks.vue";


vi.mock("vue-router", () => ({
    resolve: vi.fn(), RouterLink: vi.fn(),
}));



describe("Tasks.vue", () => {
    const restHandlers = [http.get('http://localhost:5000/tasks', () => {
        return HttpResponse.json([{
            "id": "0",
            "name": "Create Component for Task",
            "description": "Create a component to be reused for every Task, that will be used by the Tasks component",
            "completedBy": "2024-09-14",
            "done": true
        }, {
            "id": "1", "name": "test", "description": "test description", "completedBy": "2024-09-26", "done": true
        }, {
            "id": "2",
            "name": "Endpoint for Add Task",
            "description": "Create a way to add Tasks",
            "completedBy": "2024-09-25",
            "done": false
        }, {
            "id": "3",
            "name": "See separate tasks",
            "description": "Create a way to see a task with a specific id",
            "completedBy": "2024-09-25",
            "done": false
        }], {status: 200})
    })];
    const server = setupServer(...restHandlers);
    beforeAll(() => server.listen({onUnhandledRequest: 'error'}));
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());
    it("renders correctly with limit 3", () => {
        const wrapper = mount(Tasks, {
            props: {
                limit: 3
            }
        });
        expect(wrapper.text()).toContain('Browse Current Tasks');
        expect(document.querySelector('#grid')).toBeDefined();
        expect(wrapper.vm.state.tasks.length).toEqual(3);
    })
})