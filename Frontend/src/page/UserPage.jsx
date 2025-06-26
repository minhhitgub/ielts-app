import React, { useState } from 'react';
import Sidebar from '../component/SideBar';
import Content from '../component/Content';

function UserPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="flex fixed m-0 p-0 top-0 left-0 w-[100%] h-[100%]">
      <Sidebar onSelect={setSelectedOption} />
      <Content selected={selectedOption} />
    </div>
  );
}

export default UserPage;
