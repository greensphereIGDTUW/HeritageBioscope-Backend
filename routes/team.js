import express from 'express'; 
import {fetchTeam, fetchTeambyId , createTeam} from '../controllers/team.js'; 


const router = express.Router(); 

router.get('/', fetchTeam);
router.get('/:id', fetchTeambyId );
router.post('/', createTeam);


export default router; 