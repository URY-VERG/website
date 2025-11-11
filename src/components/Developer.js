import React, { useState } from "react";
import "./Developer.css";

const Member = ({ title, name, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="member">
      <div className="member-header" onClick={() => setOpen(!open)}>
        <span className="role">{title}:</span> <span className="name">{name}</span>
        {children && <span className="toggle">{open ? "🔽" : "▶️"}</span>}
      </div>
      {open && children && <ul className="sub-list">{children}</ul>}
    </li>
  );
};

const Developer = () => {
  return (
    <div className="company-hierarchy">
      <h2> Company Hierarchy</h2>
      <ul className="hierarchy-list">
        <Member title="CEO" name="Tejas">
          <>
            <Member title="COO" name="Shreya" />
            <Member title="CTO" name="Rudraksh" />
            <Member title="CFO" name="Sakshi" />
            <Member title="CMO" name="Vaishnavi" />
            <Member title="Head (R&D)" name="Sumit">
              <>
                <Member title="Agriculture Expert" name="Saurabh" />
                <Member title="Community Manager" name="Dhananjay" />
              </>
            </Member>
          </>
        </Member>
      </ul>
    </div>
  );
};

export default Developer;