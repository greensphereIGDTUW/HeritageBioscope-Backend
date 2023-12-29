import express from 'express'; 
import {registerUser, loginStudent , updateUser,deleteUser,getUser} from '../controllers/user.js'; 

const router = express.Router(); 

router.post('/register', registerUser);
router.post('/login', loginStudent);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; 