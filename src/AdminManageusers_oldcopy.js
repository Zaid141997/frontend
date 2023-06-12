import React from 'react'
import './Adminskillcatalog.css'
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import { Table, Button, Form, Input, Dropdown,Segment,Header, Divider } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { fontSize } from '@mui/system';
function AdminManageusers() {
    const genderoptions = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female'},
      { label: 'Other', value: 'Other'},
      ]
      const navigate = useNavigate()
      const handleGoBack=() =>{
      navigate('/admin-homepage')
  }
return(

<div>
<Segment attached style={{borderColor: 'black'}}> 
         <Header as='h1' textAlign='center' color ='purple' style={{fontSize:'40px'}}>Manage Users</Header>
         <Button color='purple' size='large' onClick={handleGoBack} 
         style={{position:'absolute', top:'20px',right:'10px'}}>
          Home
          </Button>
         
      </Segment> 
      <Divider hidden />
<Form className='skillform'>
<Form.Group widths='equal'>
          <Form.Input fluid 
          label={<label style={{fontSize: '20px'}}>First Name</label>}
           placeholder='First name'
           style ={{fontSize: '20px'}}
           required/>
          <Form.Input fluid 
          label={<label style={{fontSize: '20px'}}>Middle Name</label>}
           placeholder='Middle name'
           style ={{fontSize: '20px'}}
           />
          <Form.Input fluid 
          label={<label style={{fontSize: '20px'}}>Last Name</label>}
           placeholder='Last name' 
           style ={{fontSize: '20px'}}
           required />
 </Form.Group>
 <Form.Group >
 <Form.Input 
 label={<label style={{fontSize: '20px'}}>Email ID</label>}
 placeholder='Email ID'
 type='email' 
 style={{width: '592px', fontSize: '20px'}} 
  required />

  <Autocomplete
     disablePortal
     id='gender-autocomplete'
     options={genderoptions}
     sx={{width: 300}}
     renderInput={(params) => <TextField{...params} label='Gender' />}
     />
</Form.Group>

<Form.Group inline>
          <label style={{fontSize: '20px'}}>Roles</label>
          <Form.Radio
            label={<label style={{fontSize: '22px'}}>Admin</label>}  
          />
          <Form.Radio
            label={<label style={{fontSize: '22px'}}>Employee</label>}
          />
          <Form.Radio
            label={<label style={{fontSize: '22px'}}>Project Manager</label>}
          />
</Form.Group>
<Divider hidden />
  <Button color='purple' size='huge'>Save
  </Button>
</Form>
<Divider hidden />

  <Table celled border='5' className='skilltable'>
  <Table.Header>
      <Table.Row >
          <Table.HeaderCell style={{fontSize:'20px'}}>First Name</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize:'20px'}}>Middle Name</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize:'20px'}}>Last Name</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize:'20px'}}>Gender</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize:'20px'}}>Role</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize:'20px'}}>Email Address</Table.HeaderCell>
          <Table.HeaderCell style={{fontSize:'20px'}}>Actions</Table.HeaderCell>
      </Table.Row>
      </Table.Header>
      
       </Table>
       
</div>
)
}
export default AdminManageusers;