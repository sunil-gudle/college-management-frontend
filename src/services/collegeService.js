// src/services/collegeService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/colleges';

export const createCollege = (college) => axios.post(BASE_URL, college);
export const getAllColleges = () => axios.get(BASE_URL);
export const getCollegeById = (id) => axios.get(`${BASE_URL}/${id}`);
