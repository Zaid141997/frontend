import React, { useEffect, useState } from 'react';
import './Adminskillcatalog.css'
import { Table, Modal, Form, Radio, Button,Segment,Header,Divider,Icon, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const rolesOptions = [
{ label: 'Admin', value: 'Admin' },
{ label: 'Employee', value: 'Employee' },
{ label: 'Project Manager', value: 'Project Manager' },
];

const statusOptions = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
  ];

function AdminManageusers () {

const navigate = useNavigate();
 const handleGoBack=() => {
    navigate('/admin-homepage')
  }
const [user, setUser] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [selectedRole, setSelectedRole] = useState('');
const [selectedStatus, setSelectedStatus] = useState('');
const [modalOpen, setModalOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
  try {
  const response = await axios.get('http://localhost:3001/users', {
  headers: {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  });
  setUser(response.data);
  } catch (error) {
  console.log('Error fetching users:', error);
  }
  };
  
  const handleEditUser = (user) => {
  setSelectedUser(user);
  setSelectedRole(user.role);
  setSelectedStatus(user.status);
  setModalOpen(true);
  };

// const handleSaveChanges = async () => {
// if (selectedUser) {
// const updatedUsers = users.map((user) =>
// user.id === selectedUser.id
// ? {
// ...user,
// role: selectedRole,
// status: selectedStatus,
// }
// : user
// );
// setUsers(updatedUsers);
// setModalOpen(false);
// setSelectedUser(null);
// setSelectedRole('');
// setSelectedStatus('');
// }
// };



// const handleSaveChanges = async () => {
//   if (selectedUser) {

//   try {
//   await axios.put(`http://localhost:3001/users/${selectedUser._id}`, {
//   role: selectedRole,
//   status: selectedStatus,
//   }, {
//   headers: {
//   Authorization: `Bearer ${localStorage.getItem('token')}`,
//   },
//   });
  
//   const updatedUsers = user.map((user) =>
//   user.id === selectedUser._id ? { ...user, role: selectedRole, status: selectedStatus } : user
//   );
//   setUser(updatedUsers);
//   setModalOpen(false);
//   setSelectedUser(null);
//   setSelectedRole('');
//   setSelectedStatus('');
//   const response = await axios.get('http://localhost:3001/users', {
//   headers: {
//   Authorization: `Bearer ${localStorage.getItem('token')}`,
//   }})
 
//   } catch (error) {
//   console.log('Error updating user:', error);
//   }
//   }
//   };

const handleSaveChanges = () => {
  if (selectedUser) {
  const updatedUsers = user.map((user) =>
  user.id === selectedUser._id
  ? {
  ...user,
  role: selectedRole,
  status: selectedStatus,
  }
  : user
  );
  setUser(updatedUsers);
  setModalOpen(false);
  setSelectedUser(null);
  setSelectedRole('');
  setSelectedStatus('');
  
  // Make an API call to update the user data in the backend database
  fetch(`http://localhost:3001/users/${selectedUser._id}`, {
  method: 'PUT',
  headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify({
  role: selectedRole,
  status: selectedStatus,
  }),
  })
  .then((response) => response.json())
  .then((data) => {
  // Re-fetch the user data from the server to get the updated data
  fetch('http://localhost:3001/users', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  })
  .then((response) => response.json())
  .then((data) => {
  setUser(data); // Update the user data in the frontend with the fetched data
  })
  .catch((error) => {
  console.error('Error fetching user data:', error);
  });
  
  // Handle the response from the API, if needed
  console.log('User data updated in the backend:', data);
  })
  .catch((error) => {
  // Handle any error that occurs during the API call
  console.error('Error updating user data:', error);
  });
  }
  };

    const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setSelectedRole('');
    setSelectedStatus('');
    };
    
    const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    };
    
    const filteredUsers = user.filter((user) => {
    const { email } = user;
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return email.toLowerCase().includes(normalizedQuery);
    });



const modalStyle={
  width: "800px",
 // height:"500px"
}

return (
  <div>
   <Segment attached style={{borderColor: 'black'}}> 
         <Header as='h1' textAlign='center' color ='purple' style={{fontSize:'40px'}}>Manage Users</Header>
         <Icon name='home' color='purple' size='big' onClick={handleGoBack} 
         style={{position:'absolute', top:'20px',left:'10px'}} /> 
         
      </Segment> 
  <Divider hidden /> 
<div className='usermanagement'>
<div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
 <Input 
   icon= 'search'
   iconPosition='right'
   type="text"
   placeholder="Search by email ID"
   value={searchQuery}
   onChange={handleSearch}
   style ={{width:"1000px", height:"50px", fontSize:'20px'}}
  />
  </div>
<Divider hidden />  
<Divider hidden />  
  <Table celled className='usertable'>
   <Table.Header>
     <Table.Row style={{fontSize:'21px'}}>
       <Table.HeaderCell style={{width:"300px"}}>First Name</Table.HeaderCell>
       <Table.HeaderCell style={{width:"300px"}}>Last Name</Table.HeaderCell>
       <Table.HeaderCell style={{width:"500px"}}>Email ID</Table.HeaderCell>
       <Table.HeaderCell style={{width:"200px"}}>Role</Table.HeaderCell>
       <Table.HeaderCell style={{width:"200px"}}>Status</Table.HeaderCell>
       <Table.HeaderCell style={{width:"100px"}}>Action</Table.HeaderCell>
       </Table.Row>
       </Table.Header>

       <Table.Body style={{fontSize:'20px'}}>
       {filteredUsers.map((user) => (
        <Table.Row key={user.id}>
        <Table.Cell>{user.firstname}</Table.Cell>
        <Table.Cell>{user.lastname}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.role}</Table.Cell>
        <Table.Cell>{user.status}</Table.Cell>
        <Table.Cell>
          <Button color='purple' size='large' onClick={()=>handleEditUser(user)}>Edit</Button>
        </Table.Cell>
      </Table.Row>
       ))}
       </Table.Body>
       </Table>
   {selectedUser && (
   <Modal size= 'large'  open={modalOpen} onClose={handleCloseModal} style={modalStyle}>
    <Modal.Header>Edit User</Modal.Header>
    <Modal.Content>
    <div>
    <Form>
      <Form.Field>
        <label style={{fontSize:'17px'}}>First Name</label>
        <input value={selectedUser.firstname} style={{fontSize:'17px'}} disabled />
      </Form.Field>
      <Divider style={{margin:'6px 0'}} hidden/>
      <Form.Field>
        <label style={{fontSize:'17px'}} >Last Name</label>
        <input value={selectedUser.lastname} style={{fontSize:'17px'}} disabled />
      </Form.Field>
      <Divider style={{margin:'6px 0'}} hidden/>
      <Form.Field>
        <label style={{fontSize:'17px'}}>Email ID</label>
        <input value={selectedUser.email} style={{fontSize:'17px'}} disabled />
      </Form.Field>
      <Divider style={{margin:'6px 0'}} hidden/>
      <Form.Field>
        <label style={{fontSize:'17px'}}>Role</label>
        <Divider style={{margin:'5px 0'}} hidden/>
        <Form.Group>
          {rolesOptions.map((option) => (
           <Form.Field
              key={option.value}
              control={Radio}
              label={<label style={{ fontSize: '17px' }}>{option.label}</label>}
              value={option.value}
              checked={selectedRole === option.value}
              onChange={() => setSelectedRole(option.value)}
            />
        ))}
        </Form.Group>
      </Form.Field>
       
      <Form.Field>
        <label style={{fontSize:'17px'}}>Status</label>
        <Divider style={{margin:'5px 0'}} hidden/>
        <Form.Group>
          {statusOptions.map((option) => (
           <Form.Field
              key={option.value}
              control={Radio}
              label={<label style={{ fontSize: '17px' }}>{option.label}</label>}
              value={option.value}
              checked={selectedStatus === option.value}
              onChange={() => setSelectedStatus(option.value)}
            />
        ))}
        </Form.Group>
      </Form.Field>
    </Form>
    </div>
    </Modal.Content>
    <Modal.Actions>
       <Button color='purple' size='large' onClick={handleSaveChanges}>Save</Button>
       <Button onClick={handleCloseModal} size='large'>Cancel</Button>
    </Modal.Actions>
   </Modal>
   )}
  </div> 
  </div>
)}

export default AdminManageusers;