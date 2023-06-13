import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addData2 } from "../../Data/data";
import "../Add-New-Account/addNewAccount.css";

function AddNewAccount({ userData, setUserData, setFilteredUserData  }) {
  const [show, setShow] = useState(false);
  const [sosyalMedyaLinki, setSosyalMedyaLinki] = useState("");
  const [sosyalMedyaAdi, setSosyalMedyaAdi] = useState("");
  const [acıklama, setAcıklama] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    setSosyalMedyaLinki(event.target.value);
  };

  const handleSosyalMedyaAdiChange = (event) => {
    setSosyalMedyaAdi(event.target.value);
  };

  const handleAciklamaChange = (event) => {
    setAcıklama(event.target.value);
  };

  const handleSave = () => {
    const newData = {
      sosyalMedyaLinki: sosyalMedyaLinki,
      sosyalMedyaAdi: sosyalMedyaAdi,
      acıklama: acıklama,
    };

    setUserData((prev) => [...prev, newData]);
    setFilteredUserData((prev) => [...prev, newData]);


    //LocalStorage'a eklemiş olduğum kullanıyı kaydediyorum. 
    const savedData = localStorage.getItem("savedData");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    parsedData.push(newData);
    localStorage.setItem("savedData", JSON.stringify(parsedData));
  } else {
    localStorage.setItem("savedData", JSON.stringify([newData]));
  }

    handleClose();
  };

  return (
    <>
      <button onClick={handleShow} className="addAccountButton">
        <span className="plusIcon">+</span>
        <span className="d-none d-sm-none d-xs-none d-lg-inline">Yeni Hesap Ekle</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sosyal Medya Linki</Form.Label>
              <Form.Control
                id="sosyalMedyaLinki"
                type="text"
                value={sosyalMedyaLinki}
                onChange={handleInputChange}
                autoFocus
                style={{ borderRadius: "38px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sosyal Medya Adı</Form.Label>
              <Form.Control
                id="sosyalMedyaAdi"
                value={sosyalMedyaAdi}
                onChange={handleSosyalMedyaAdiChange}
                type="text"
                autoFocus
                style={{ borderRadius: "38px" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                id="aciklama"
                value={acıklama}
                onChange={handleAciklamaChange}
                type="text"
                autoFocus
                style={{ borderRadius: "38px" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              background: "#F5F7FF",
              color: "#744BFC",
              borderRadius: "34px",
              border: "none",
            }}
          >
            Vazgeç
          </Button>
          <Button
            variant="primary"
            style={{
              background: "#744BFC",
              borderRadius: "34px",
              width: "82.76px",
              height: "37.02px",
              border: "none",
            }}
            onClick={handleSave}
          >
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewAccount;
