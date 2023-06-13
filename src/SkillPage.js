import React, { useState } from 'react';
import { Tab, Form, Input, Button, Table, Icon, Modal } from 'semantic-ui-react';

const SkillPage = () => {
  const [primarySkill, setPrimarySkill] = useState({
    skillName: '',
    experience: '',
    certification: ''
  });
  const [primaryTableData, setPrimaryTableData] = useState([]);
  const [primarySelectedSkill, setPrimarySelectedSkill] = useState(null);

  const [secondarySkill, setSecondarySkill] = useState({
    skillName: '',
    experience: '',
    certification: ''
  });
  const [secondaryTableData, setSecondaryTableData] = useState([]);
  const [secondarySelectedSkill, setSecondarySelectedSkill] = useState(null);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation modal
  const [deleteConfirmationIndex, setDeleteConfirmationIndex] = useState(null); // State to track the index of skill to be deleted
  const [alertMessage, setAlertMessage] = useState(null); // State for displaying alert messages

  const handlePrimaryInputChange = (e, { name, value }) => {
    setPrimarySkill({ ...primarySkill, [name]: value });
  };

  const handleSecondaryInputChange = (e, { name, value }) => {
    setSecondarySkill({ ...secondarySkill, [name]: value });
  };

  const handlePrimarySave = () => {
    setPrimaryTableData([...primaryTableData, primarySkill]);
    setPrimarySkill({ skillName: '', experience: '', certification: '' });
  };

  const handleSecondarySave = () => {
    if (secondaryTableData.length >= 10) {
      setAlertMessage('Upto 10 secondary skills can be added.');
      return;
    }

    setSecondaryTableData([...secondaryTableData, secondarySkill]);
    setSecondarySkill({ skillName: '', experience: '', certification: '' });
  };

  const handlePrimaryEdit = (index) => {
    const skillToEdit = primaryTableData[index];
    setPrimarySelectedSkill(skillToEdit);
    setPrimarySkill(skillToEdit);
  };

  const handleSecondaryEdit = (index) => {
    const skillToEdit = secondaryTableData[index];
    setSecondarySelectedSkill(skillToEdit);
    setSecondarySkill(skillToEdit);
  };

  const handlePrimaryUpdate = () => {
    const updatedTableData = [...primaryTableData];
    const skillIndex = updatedTableData.findIndex((skill) => skill === primarySelectedSkill);
    updatedTableData[skillIndex] = primarySkill;
    setPrimaryTableData(updatedTableData);
    setPrimarySelectedSkill(null);
    setPrimarySkill({ skillName: '', experience: '', certification: '' });
  };

  const handleSecondaryUpdate = () => {
    const updatedTableData = [...secondaryTableData];
    const skillIndex = updatedTableData.findIndex((skill) => skill === secondarySelectedSkill);
    updatedTableData[skillIndex] = secondarySkill;
    setSecondaryTableData(updatedTableData);
    setSecondarySelectedSkill(null);
    setSecondarySkill({ skillName: '', experience: '', certification: '' });
  };

  const handlePrimaryDelete = (index) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationIndex(index);
  };

  const handleSecondaryDelete = (index) => {
    setDeleteConfirmationOpen(true);
    setDeleteConfirmationIndex(index);
  };

  const handleDeleteConfirmation = () => {
    if (deleteConfirmationIndex !== null) {
      if (deleteConfirmationIndex < primaryTableData.length) {
        const updatedTableData = [...primaryTableData];
        updatedTableData.splice(deleteConfirmationIndex, 1);
        setPrimaryTableData(updatedTableData);
      } else {
        const updatedTableData = [...secondaryTableData];
        updatedTableData.splice(deleteConfirmationIndex - primaryTableData.length, 1);
        setSecondaryTableData(updatedTableData);
      }
      setDeleteConfirmationOpen(false);
      setDeleteConfirmationIndex(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setDeleteConfirmationIndex(null);
  };

  const renderSkillTab = (
    skill,
    handleInputChange,
    handleSave,
    handleEdit,
    handleUpdate,
    handleDelete,
    tableData,
    selectedSkill
  ) => (
    <Tab.Pane>
      <Form>
        <Form.Group widths="equal"> {/* Set equal width for the form inputs */}
          <Form.Input
            name="skillName"
            placeholder="Skill Name"
            value={skill.skillName}
            onChange={handleInputChange}
          />
          <Form.Input
            name="experience"
            placeholder="Years of Experience"
            value={skill.experience}
            onChange={handleInputChange}
          />
          <Form.Input
            name="certification"
            placeholder="Certification"
            value={skill.certification}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          {selectedSkill ? (
            <Form.Button primary onClick={handleUpdate}>
              Update
            </Form.Button>
          ) : (
            <Form.Button primary onClick={handleSave}>
              Save
            </Form.Button>
          )}
        </Form.Group>
      </Form>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Skill Name</Table.HeaderCell>
            <Table.HeaderCell>Skill Description</Table.HeaderCell>
            <Table.HeaderCell>Years of Experience</Table.HeaderCell>
            <Table.HeaderCell>Certification</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((skill, index) => (
            <Table.Row key={index}>
              <Table.Cell>{skill.skillName}</Table.Cell>
              <Table.Cell>Skill Description Placeholder</Table.Cell>
              <Table.Cell>{skill.experience}</Table.Cell>
              <Table.Cell>{skill.certification}</Table.Cell>
              <Table.Cell>
                <Icon
                  name="edit"
                  onClick={() => handleEdit(index)}
                  style={{ cursor: 'pointer' }}
                />
                <Icon
                  name="delete"
                  onClick={() => handleDelete(index)}
                  style={{ cursor: 'pointer' }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancel}
        size="tiny"
      >
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          Are you sure you want to delete this skill?
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={handleDeleteCancel}>
            No
          </Button>
          <Button positive onClick={handleDeleteConfirmation}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
      {/* Alert Message */}
      {alertMessage && (
        <div className="alert">{alertMessage}</div>
      )}
    </Tab.Pane>
  );

  return (
    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={[
        {
          menuItem: 'Primary Skill',
          render: () =>
            renderSkillTab(
              primarySkill,
              handlePrimaryInputChange,
              handlePrimarySave,
              handlePrimaryEdit,
              handlePrimaryUpdate,
              handlePrimaryDelete,
              primaryTableData,
              primarySelectedSkill
            )
        },
        {
          menuItem: 'Secondary Skill',
          render: () =>
            renderSkillTab(
              secondarySkill,
              handleSecondaryInputChange,
              handleSecondarySave,
              handleSecondaryEdit,
              handleSecondaryUpdate,
              handleSecondaryDelete,
              secondaryTableData,
              secondarySelectedSkill
            )
        }
      ]}
    />
  );
};

export default SkillPage;
