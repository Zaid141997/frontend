import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Segment,Image,Divider} from 'semantic-ui-react';
import axios from 'axios';

function Adminfrontpage() {
  
   return ( 
     <div>
       <div>
       <Segment size='huge' attached = 'top'> 
            <Image src='Accenture icon.png' size='small' />
           
       </Segment> 
       <Segment attached> 
       <Header as='h1'size='huge'>Hello !</Header>
       </Segment> 
       <Divider 
       style={{margin: '3rem 0', display:'inline-block'}}
       />
       </div>
       
       <div style ={{ display: 'flex', justifyContent: 'left'}}>
         <a href='/admin-skillcatalog' style={{marginRight : '240px', marginLeft:'5px'}}>
           <Image src = "skillcatalog.jpg" as="a" size='large' bordered />
           <Header as="h2" color='purple' textAlign='center'size='large' style={{fontSize: '30px'}}>Skill Catalog</Header>
         </a>
         <a href='/admin-managerusers' style={{marginRight : '240px'}}>
           <Image src = "New User.jpg" as="a" size='large' bordered />
           <Header as="h2" color='purple' textAlign='center'size='large' style={{fontSize: '30px'}}>Manager Users</Header>
         </a>
         <a href='/page3' style={{marginRight : '240px'}}>
           <Image src = "report.jpg" as="a" size='large' bordered />
           <Header as="h2" color='purple' textAlign='center'size='large' style={{fontSize: '30px'}}>Generate Report</Header>
         </a>
       </div>
     </div>
   );
 }
   
export default Adminfrontpage
