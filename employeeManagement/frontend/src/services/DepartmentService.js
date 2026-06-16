import axios from 'axios';

const BASE = process.env.REACT_APP_DEPARTMENT_API_BASE_URL;

const DepartmentService = {
    getAll: () => axios.get(BASE),
    create: (dept) => axios.post(BASE, dept),
    findByName: (name) => axios.get(`${BASE}/search`, { params: { name } }),
    countEmployees: (id) => axios.get(`${BASE}/${id}/employees/count`),
    remove: (id) => axios.delete(`${BASE}/${id}`),
};

export default DepartmentService;
