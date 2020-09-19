import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { addForm } from "../../reducers/formManagement";
import { Redirect } from "react-router-dom";
import Select from 'react-select';
import "./Form.css";

function InputFormScreen(props) {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.address.userAddress);
  const offices = useSelector((state) => state.address.offices);
  const userId = useSelector((state) => state.authentication.user.id);
  const submittedForm = useSelector((state) => state.formManagement.form);

  const [officeSelected, setOfficeSelected] = useState();

  const officeTitleOps = useMemo(() => offices.map((e, i) => ({ id: i + 1, label: e.name, value: e.name })), [])


  const [form, setForm] = useState({
    userId,
    candidateName: "",
    officeTitle: "",
    district: "statewide",
    address: userAddress,
    occupation: "",
  });

  const onCreateForm = (type) => (e) => {
    e.preventDefault();
    dispatch(addForm({ ...form, officeTitle: officeSelected?.value || '' }));
    props.onGetData({ ...form, officeTitle: officeSelected?.value || '' }, type)
  };

  const handleChange = (value) => {
    // value => { id: 1, label: 'newyork', value: 'newyork' }
    setOfficeSelected(value)
  }

  const onChangeInput = (e) => {
    e.persist();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  }

  return (
    <div className='container'>
      <Row className="justify-content-center">
        <Col md="8" lg="11" xl="7" >
          <div>Title</div>
          <Select
            value={officeSelected}
            onChange={handleChange}
            options={officeTitleOps}
            className='mb-2'
          />
          <Input
            name="candidateName"
            placeholder="Name"
            className='mb-2'
            onChange={onChangeInput}
            value={form.candidateName}
          />
          <Input
            name="district"
            placeholder="District"
            className='mb-2'
            onChange={onChangeInput}
            value={form.district}
          />
          <Input
            name="address"
            placeholder="Address"
            className='mb-2'
            onChange={onChangeInput}
            value={form.address}
          />
          <Input
            name="occupation"
            placeholder="Occupation"
            className='mb-2'
            onChange={onChangeInput}
            value={form.occupation}
          />
          <Row className='justify-content-between'>
            <Col>
              <Button color="warning" onClick={onCreateForm('preview')} >Send to Preview</Button>
            </Col>
            <Col className='justify-content-end d-flex'>
              <Button color="warning" onClick={onCreateForm('download')}>Download</Button>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  );
}

export default InputFormScreen;
