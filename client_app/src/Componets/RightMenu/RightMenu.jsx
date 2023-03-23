import React, { useEffect } from "react";
import { Email } from "../Email/Email";
import "../RightMenu/rightMenu.css";
export const RightMenu = ({ active, setActive }) => {
  useEffect(() => {
    setActive(false);
  }, []);

  return (
    <div>
      {active && (
        <aside className="RightMenu">
          <Email />
        </aside>
      )}
    </div>
  );
};
