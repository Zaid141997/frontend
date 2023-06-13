//front end code

import React, { useState, useEffect } from 'react';
import { Form, Button, Tab, Segment, Image, Header, Divider } from 'semantic-ui-react';

const PrimarySkillForm = ({ onSave, skillOptions }) => {
  const [primarySkill, setPrimarySkill] = useState({
    skillId: '', // Change skillName to skillId
    yearsOfExperience: '',
    certification: '',
  });

  const handlePrimarySkillChange = (e, { name, value }) => {
    setPrimarySkill({ ...primarySkill, [name]: value });
  };

  ////

  const handleSave = async () => {
    try {
      const email = localStorage.getItem('email'); // Get email from local storage
      const token = localStorage.getItem('token'); // Get authorization token from local storage

      const response = await fetch('http://localhost:3001/primary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({
          email,
          primarySkill: {
            skillId: primarySkill.skillId, // Change skillName to skillId
            yearsOfExperience: primarySkill.yearsOfExperience,
            certification: primarySkill.certification,
          },
        }),
      });

      if (response.ok) {
        onSave();
      } else {
        console.error('Failed to save primary skill.');
      }
    } catch (error) {
      console.error('Error saving primary skill:', error);
    }
  };

  return (
    <Tab.Pane>
      <Divider style={{ margin: '1rem 0' }} hidden />
      <Form>
        <Form.Group widths="equal">
          <Form.Dropdown
            label={<label style={{ fontSize: '20px', marginBottom: '18px' }}>Skill Name</label>}
            placeholder="Skill Name"
            name="skillId" // Change name to "skillId"
            options={skillOptions}
            search
            selection
            value={primarySkill.skillId} // Change skillName to skillId
          
            onChange={handlePrimarySkillChange}
            style={{ fontSize: '20px' }}
            required
          />
          <Form.Input
            label={<label style={{ fontSize: '20px', marginBottom: '18px' }}>Years of Experience</label>}
            placeholder="Years of Experience"
            name="yearsOfExperience"
            value={primarySkill.yearsOfExperience}
            onChange={handlePrimarySkillChange}
            style={{ fontSize: '20px' }}
            required
          />
          <Form.Input
            label={<label style={{ fontSize: '20px', marginBottom: '18px' }}>Certification</label>}
            placeholder="Certification Name"
            name="certification"
            value={primarySkill.certification}
            onChange={handlePrimarySkillChange}
            style={{ fontSize: '20px' }}
          />
        </Form.Group>
        <Divider style={{ margin: '1rem 0' }} hidden />
        <Button color="purple" onClick={handleSave} size="big">
          Save
        </Button>
      </Form>
    </Tab.Pane>
  );
};

const SecondarySkillForm = ({ onSave, skillOptions }) => {
  const [secondarySkills, setSecondarySkills] = useState([
    { skillId: '', yearsOfExperience: '', certification: '' },
  ]);

  const handleSecondarySkillChange = (index, name, value) => {
    const updatedSkills = [...secondarySkills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: value };
    setSecondarySkills(updatedSkills);
  };

  const handleAddSecondarySkill = () => {
    if (secondarySkills.length < 10) {
      setSecondarySkills([
        ...secondarySkills,
        { skillId: '', yearsOfExperience: '', certification: '' },
      ]);
    }
  };

  const handleDeleteSecondarySkill = (index) => {
    const updatedSkills = [...secondarySkills];
    updatedSkills.splice(index, 1);
    setSecondarySkills(updatedSkills);
  };

 
  const handleSave = async () => {
    try {
      const email = localStorage.getItem('email'); // Get email from local storage
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3001/secondary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({
          email,
          secondarySkills: secondarySkills.map((skill) => ({
            skillId: skill.skillId, // Change skillName to skillId
            yearsOfExperience: skill.yearsOfExperience,
            certification: skill.certification,
          })),
        }),
      });

      if (response.ok) {
        onSave();
      } else {
        console.error('Failed to save secondary skills.');
      }
    } catch (error) {
      console.error('Error saving secondary skills:', error);
    }
  };


  const secondarySkillsForm = secondarySkills.map((skill, index) => (
    <Form key={index}>
      <Form.Group widths="equal">
        <Form.Dropdown
          label={<label style={{ fontSize: '20px', marginBottom: '18px' }}>Skill Name</label>}
          placeholder="Skill Name"
          //name="skillName"
          name="skillId" // Change name to "skillId"
          options={skillOptions}
          search
          selection
          value={skill.skillId} // Change skillName to skillId
          onChange={(e, { value }) => handleSecondarySkillChange(index, 'skillId', value)} // Change skillName to skillId
          required
          style={{ fontSize: '20px' }}
        />
        <Form.Input
          label={<label style={{ fontSize: '20px', marginBottom: '18px' }}>Years of Experience</label>}
          placeholder="Years of Experience"
          name="yearsOfExperience"
          value={skill.yearsOfExperience}
          onChange={(e, { value }) =>
            handleSecondarySkillChange(index, 'yearsOfExperience', value)
          }
          required
          style={{ fontSize: '20px' }}
        />
        <Form.Input
          label={<label style={{ fontSize: '20px', marginBottom: '18px' }}>Certification</label>}
          placeholder="Certification"
          name="certification"
          value={skill.certification}
          onChange={(e, { value }) =>
            handleSecondarySkillChange(index, 'certification', value)
          }
          style={{ fontSize: '20px' }}
        />
        <Button
          negative
          icon="trash"
          onClick={() => handleDeleteSecondarySkill(index)}
          disabled={index === 0}
        />
      </Form.Group>
    </Form>
  ));

  return (
    <Tab.Pane>
      <Divider style={{ margin: '1rem 0' }} hidden />
      {secondarySkillsForm}
      <Divider style={{ margin: '1rem 0' }} hidden />
      <Button size="big" color="purple" onClick={handleAddSecondarySkill} disabled={secondarySkills.length >= 10}>
        Add
      </Button>
      <Button size="big" color="purple" onClick={handleSave}>
        Save
      </Button>
    </Tab.Pane>
  );
};

const EmployeePage = () => {
  const [skillOptions, setSkillOptions] = useState([]);
  const [primarySkill, setPrimarySkill] = useState({
    skillId: '', // Change skillName to skillId
    yearsOfExperience: '',
    certification: '',
  });
  const [secondarySkills, setSecondarySkills] = useState([
    { skillId: '', yearsOfExperience: '', certification: '' },
  ]);


  useEffect(() => {
    fetchSkillNames();
    fetchEmployeeSkills();
  }, []);



  const fetchEmployeeSkills = async () => {
    try {
       const email = localStorage.getItem('email');
       const response = await fetch(`http://localhost:3001/employeeskills?email=${email}`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
       });
       const data = await response.json();

      if (data.primarySkill) {
         setPrimarySkill(data.primarySkill);
       }
       if (data.secondarySkills.length > 0) {
         setSecondarySkills(data.secondarySkills);
       }
     } catch (error) {
       console.error('Error fetching employee skills:', error);
     }
   };



  const fetchSkillNames = async () => {
    try {
      const response = await fetch('http://localhost:3001/skills', {
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });
      const data = await response.json();
      const skillNames = data.map((skill) => ({
        key: skill._id,
        text: skill.name,
        value: skill._id, 
      }));
      setSkillOptions(skillNames);
    } catch (error) {
      console.error('Error fetching skill names:', error);
    }
  };

  const handleSavePrimarySkill = (data) => {
    console.log(data);
  };

  const handleSaveSecondarySkills = (data) => {
    console.log(data);
  };

  const panes = [
    {
      menuItem: { content: <span style={{ fontSize: '2.2rem', color: 'purple' }}>Primary Skill</span> },
      render: () => (
        <PrimarySkillForm
          onSave={handleSavePrimarySkill}
          skillOptions={skillOptions}
        />
      ),
    },
    {
      menuItem: { content: <span style={{ fontSize: '2.2rem', color: 'purple' }}>Secondary Skill</span> },
      render: () => (
        <SecondarySkillForm
          onSave={handleSaveSecondarySkills}
          skillOptions={skillOptions}
        />
      ),
    },
  ];

  return (
    <div>
      <Segment size="huge" attached="top">
        <Image src="Accenture icon.png" size="small" />
      </Segment>
      <Segment size="large" attached>
        <Header as="h1" size="large">
          Hello Employee!
        </Header>
      </Segment>

      <Tab panes={panes} />
    </div>
  );
};

export default EmployeePage;