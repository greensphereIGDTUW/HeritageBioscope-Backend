import User from '../models/user.js'; 

import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {

    const {email, password} = req.body;

    const em = await User.findOne({ email });
    if (em)
      return res.status(409).send({ message: "User with given email already exists" })
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save(); 
    res.status(200).json(newUser); 
}catch(e){
    next(e); 
}
}; 


export const loginStudent = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found! Please login first"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id},
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      // sending all details except password
      .json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(404).json({ message: 'Student not found' });
      }

      await User.findByIdAndDelete(user);
      res.status(200).json("the Student has been deleted");
    } catch (err) {
      next(err);
    }
  };

export const getUser = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id); 
    if (!user){
      return res.status(404).json({message: "user not found"}); 
    }
    res.status(200).json(user); 
  }
  catch (e) {
    next(e); 
  }
}


  // export const getUser = async (req, res, next) => {
  //   try {
  //     const user = await User.findById(req.params.id)
  //     .populate({
  //       path: 'class',
  //       select: 'name subjects',
  //       populate: {
  //         path: 'subjects',
  //         model: 'Course',
  //         populate: {
  //           path: 'teacher',
  //           model: 'Faculty',
  //           select: 'teachername'
  //         }
  //       },
  //     })
  //     .exec();

  //     if (!student) {
  //       return res.status(404).json({ message: 'Student not found' });
  //     }

  //   // Transform the data before sending it in the response
  //   const { class: { name, ...classInfo }, ...rest } = student.toObject();
  //   const transformedStudent = { ...rest, classname: name, classInfo };

  //   res.status(200).json(transformedStudent);
  //  } catch (err) {
  //     next(err);
  //   }
  // };

//   // this function fetches info without populate
// export const getSingleStudent = async (req, res, next) => {
//   try {
//     const student = await Student.findById(req.params.id).populate('class', 'name');
//     res.status(200).json(student);
//   } catch (err) {
//     next(err);
//   }
// };

//   export const getStudents = async (req, res, next) => {
//     try {
//       const students = await Student.find()
//       .populate('class', 'name')

//       const transformedStudents = students.map(student => {
//         if (student.class) {
//           const { class: { name, ...classInfo }, ...rest } = student.toObject();
//           return { ...rest, classname: name, classInfo };
//         } else {
//           // Handle the case where 'class' property is undefined
//           return student.toObject();
//         }
//       });

//       res.status(200).json(transformedStudents);
//     } catch (err) {
//       next(err)
//     }
//   }; 
