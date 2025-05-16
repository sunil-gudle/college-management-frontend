import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(0);

  const fetchColleges = (pageNumber) => {
    axios.get(`http://localhost:8080/api/colleges?page=${pageNumber}&size=5`)
      .then((response) => {
        setColleges(response.data.content);
        setPageInfo(response.data.page);
      })
      .catch((error) => {
        console.error("Error fetching colleges:", error);
      });
  };

  useEffect(() => {
    fetchColleges(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < pageInfo.totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Colleges</h1>
      {colleges.map((college) => (
        <div key={college.id} className="border rounded-xl p-4 mb-6 shadow">
          <h2 className="text-xl font-semibold">{college.name}</h2>
          <p className="text-gray-600">{college.location}</p>

          <h3 className="text-lg mt-3 font-medium">Departments:</h3>
          {college.departments.map((dept) => (
            <div key={dept.id} className="ml-4 mt-2">
              <h4 className="font-semibold">{dept.name}</h4>

              <p className="text-sm text-gray-700">Professors:</p>
              <ul className="list-disc ml-5">
                {dept.professors.map((prof) => (
                  <li key={prof.id}>{prof.name} – {prof.subject}</li>
                ))}
              </ul>

              <p className="text-sm text-gray-700 mt-2">Students:</p>
              <ul className="list-disc ml-5">
                {dept.students.map((student) => (
                  <li key={student.id}>
                    {student.name || <em>(No name)</em>} – {student.email} – {student.mobileNo}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page + 1} of {pageInfo.totalPages}</span>
        <button
          onClick={handleNext}
          disabled={page >= pageInfo.totalPages - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CollegeList;
