import { useEffect, useState } from "react";
import axios from "axios";

function ContactList({ refresh }) {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");


  const fetchContacts = async () => {
    const res = await axios.get("https://contact-backend.onrender.com/api/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, [refresh]);

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    fetchContacts();
  };

  const updateContact = async (id) => {
    await axios.put(`http://localhost:5000/api/contacts/${id}`, {
      name: editName
    });
    setEditId(null);
    fetchContacts();
  };

  const sortByName = () => {
    const sorted = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sorted);
  };

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between mb-3">
        <h5>Contacts</h5>
        <button className="btn btn-outline-secondary btn-sm" onClick={sortByName}>
          Sort by Name
        </button>
      </div>

      <ul className="list-group">
        {contacts.map((c) => (
          <li key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === c._id ? (
              <div className="d-flex gap-2">
             <input
              className="form-control"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Name"
             />
          <input
           className="form-control"
           value={editPhone}
           onChange={(e) => setEditPhone(e.target.value)}
           placeholder="Phone"
          />
         </div>
        ) : (
        <span>
        <strong>{c.name}</strong> — {c.phone}
       </span>
       )}

            <div>
              {editId === c._id ? (
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateContact(c._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(c._id);
                    setEditName(c.name);
                    setEditPhone(c.phone);
                  }}
                >
                  Edit
                </button>
              )}

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteContact(c._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
