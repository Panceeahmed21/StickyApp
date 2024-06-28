import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import Note from "../Note/Note";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import { noteAtom } from "../../Atoms/noteAtom";

export default function Home() {
  let userToken = localStorage.getItem("userToken") || null;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [noteLength, setNoteLength] = useRecoilState(noteAtom);

  const [userNotes, setUserNotes] = useState(false);
  const [error, setIsError] = useState(false);

  async function addNote(values) {
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
        headers: {
          token: `3b8ny__${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        values.title = "";
        values.content = "";
        getNotes();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleClose();
      });
  }

  async function getNotes() {
    await axios
      .get("https://note-sigma-black.vercel.app/api/v1/notes", {
        headers: {
          token: `3b8ny__${userToken}`,
        },
      })
      .then((res) => {
        setUserNotes(res?.data?.notes);
        setNoteLength(res?.data?.notes.length);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setNoteLength(0);
      });
  }

  async function deleteNote(noteID) {
    await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`, {
        headers: {
          token: `3b8ny__${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        getNotes();
      })
      .catch((err) => console.log(err));
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,
  });

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <button
        className=" btn bg-primary text-white d-block ms-auto"
        variant="primary"
        onClick={handleShow}
      >
        <i class="fa-solid fa-plus me-2 "></i>
        Add Note
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              name="title"
              type="text"
              className="form-control mb-2"
              placeholder="Enter Note "
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <textarea
              name="content"
              id="content"
              className="form-control"
              placeholder="Enter note content"
              style={{ resize: "none" }}
              value={formik.values.content}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {error ? (
        <h2>Notes not found </h2>
      ) : (
        <div className="row g-4">
          <h2 className="mb-4">Notes</h2>
          {userNotes.length > 0 ? (
            userNotes.map((note) => {
              return (
                <>
                  <Note
                    note={note}
                    deleteFn={deleteNote}
                    noteId={note._id}
                    getNotes={getNotes}
                  ></Note>
                </>
              );
            })
          ) : (
            <h2>Notes Not found</h2>
          )}
          <p className="text-end h6 ">
            Notes number : <span className="text-primary ">{noteLength}</span>{" "}
          </p>
        </div>
      )}
    </>
  );
}
