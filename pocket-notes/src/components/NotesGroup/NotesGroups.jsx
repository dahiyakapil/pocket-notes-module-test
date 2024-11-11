import { useEffect, useState } from "react";
import stylesNotesGroup from "./NotesGroups.module.css";
import { generateNameInitials } from "../../utils/constants";

export const NotesGroups = (props) => {
  const [selectedGroupID, setselectedGroupID] = useState(null);
  const handleCreateGroupClick = (groupId) => {
    props.getNotes(groupId);
    setselectedGroupID(groupId);
  };

  return (
    <>
      <div className={stylesNotesGroup.groupcontainer}>
        <h1>Pocket Notes</h1>
        {props.groups &&
          props.groups.map((group) => (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleCreateGroupClick(group.id)}
              key={group.id}
              className={`${stylesNotesGroup.notesgroup} ${
                selectedGroupID === group.id
                  ? stylesNotesGroup.groupselected
                  : ""
              }`}
            >
              <p style={{ backgroundColor: `${group.color}` }}>
                {generateNameInitials(group.text)}
              </p>
              <p>{group.text}</p>
            </div>
          ))}

        <button
          onClick={() => {
            props.setShowModal((prevState) => !prevState);
          }}
        >
          +
        </button>
      </div>
    </>
  );
};
