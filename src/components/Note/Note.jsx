import React, { useEffect, useState } from "react";
import style from "./Note.module.css";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import axios from "axios";

export default function Note({ note, deleteFn, noteId, getNotes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleUpdate(values) {
    await axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getNotes();
        values.title = "";
        values.content = "";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        handleClose();
      });
  }

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: handleUpdate,
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
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
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="col-md-4">
       
          <Card>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <i
                class="fa-solid fa-pen-to-square me-3 fa-lg text-primary"
                variant="primary"
                onClick={handleShow}
              ></i>
              <i
                class="fa-solid fa-trash fa-lg text-primary"
                onClick={() => {
                  deleteFn(note._id);
                }}
              ></i>
            </Card.Body>
          </Card>
       
      </div>
    </>
  );
}
