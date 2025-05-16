import React, { useState } from 'react';
import axios from 'axios';

const AddCollegeForm = () => {
  const [college, setCollege] = useState({
    name: '',
    location: '',
    departments: [],
  });

  const handleAddDepartment = () => {
    setCollege({
      ...college,
      departments: [
        ...college.departments,
        { name: '', professors: [], students: [] },
      ],
    });
  };

  const handleDepartmentChange = (index, key, value) => {
    const updatedDepartments = [...college.departments];
    updatedDepartments[index][key] = value;
    setCollege({ ...college, departments: updatedDepartments });
  };

  const handleAddProfessor = (deptIndex) => {
    const updatedDepartments = [...college.departments];
    updatedDepartments[deptIndex].professors.push({ name: '', subject: '' });
    setCollege({ ...college, departments: updatedDepartments });
  };

  const handleProfessorChange = (deptIndex, profIndex, key, value) => {
    const updatedDepartments = [...college.departments];
    updatedDepartments[deptIndex].professors[profIndex][key] = value;
    setCollege({ ...college, departments: updatedDepartments });
  };

  const handleAddStudent = (deptIndex) => {
    const updatedDepartments = [...college.departments];
    updatedDepartments[deptIndex].students.push({ name: '', email: '', mobileNo: '' });
    setCollege({ ...college, departments: updatedDepartments });
  };

  const handleStudentChange = (deptIndex, studIndex, key, value) => {
    const updatedDepartments = [...college.departments];
    updatedDepartments[deptIndex].students[studIndex][key] = value;
    setCollege({ ...college, departments: updatedDepartments });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/colleges/new", college)
      .then(() => {
        alert("College added!");
        setCollege({ name: '', location: '', departments: [] });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add college");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New College</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="College Name"
          className="w-full border p-2 rounded"
          value={college.name}
          onChange={(e) => setCollege({ ...college, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={college.location}
          onChange={(e) => setCollege({ ...college, location: e.target.value })}
          required
        />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Departments</h3>
          {college.departments.map((dept, deptIndex) => (
            <div key={deptIndex} className="p-4 border rounded bg-gray-50 space-y-2">
              <input
                type="text"
                placeholder="Department Name"
                className="w-full border p-2 rounded"
                value={dept.name}
                onChange={(e) => handleDepartmentChange(deptIndex, 'name', e.target.value)}
              />

              {/* Professors */}
              <div>
                <p className="font-medium">Professors:</p>
                {dept.professors.map((prof, profIndex) => (
                  <div key={profIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="border p-1 rounded w-1/2"
                      value={prof.name}
                      onChange={(e) =>
                        handleProfessorChange(deptIndex, profIndex, 'name', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="border p-1 rounded w-1/2"
                      value={prof.subject}
                      onChange={(e) =>
                        handleProfessorChange(deptIndex, profIndex, 'subject', e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-600 text-sm underline"
                  onClick={() => handleAddProfessor(deptIndex)}
                >
                  + Add Professor
                </button>
              </div>

              {/* Students */}
              <div>
                <p className="font-medium">Students:</p>
                {dept.students.map((stud, studIndex) => (
                  <div key={studIndex} className="grid grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="border p-1 rounded"
                      value={stud.name}
                      onChange={(e) =>
                        handleStudentChange(deptIndex, studIndex, 'name', e.target.value)
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-1 rounded"
                      value={stud.email}
                      onChange={(e) =>
                        handleStudentChange(deptIndex, studIndex, 'email', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Mobile No"
                      className="border p-1 rounded"
                      value={stud.mobileNo}
                      onChange={(e) =>
                        handleStudentChange(deptIndex, studIndex, 'mobileNo', e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-600 text-sm underline"
                  onClick={() => handleAddStudent(deptIndex)}
                >
                  + Add Student
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddDepartment}
            className="mt-2 text-green-600 text-sm underline"
          >
            + Add Department
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add College
        </button>
      </form>
    </div>
  );
};

export default AddCollegeForm;
