import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import WorkView from "@/views/WorkView.vue";
import TaskView from "@/views/TaskView.vue";
import EditView from "@/views/EditView.vue";
import AddView from "@/views/AddView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/work',
            name: 'work',
            component: WorkView,
        },
        {
            path: '/work/:id',
            name: 'task',
            component: TaskView,
        },
        {
            path: '/work/edit/:id',
            name: 'work-edit',
            component: EditView,
        },
        {
            path: '/work/add',
            name: 'work-add',
            component: AddView,
        }
    ]
})

export default router;