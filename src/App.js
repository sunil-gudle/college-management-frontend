import React from 'react';
import AddCollegeForm from './components/AddCollegeForm';
import CollegeList from './components/CollegeList';

function App() {
  return (
    <div className="App">
      <AddCollegeForm />
      <hr />
      <CollegeList />
    </div>
  );
}

export default App;
