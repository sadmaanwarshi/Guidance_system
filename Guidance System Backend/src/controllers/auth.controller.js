import prisma from "../config/prisma.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";



// REGISTER
export const registerStudent =
async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    // CHECK EXISTING
    const existingStudent =
      await prisma.student.findUnique({
        where: {
          email
        }
      });

    if (existingStudent) {

      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE STUDENT
    const student =
      await prisma.student.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

    // JWT TOKEN
    const token = jwt.sign(
      {
        id: student.id,
        email: student.email
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      success: true,
      token,

      student: {
        id: student.id,
        name: student.name,
        email: student.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// LOGIN
export const loginStudent =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // FIND STUDENT
    const student =
      await prisma.student.findUnique({
        where: {
          email
        }
      });

    if (!student) {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        student.password
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // TOKEN
    const token = jwt.sign(
      {
        id: student.id,
        email: student.email
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      success: true,
      token,

      student: {
        id: student.id,
        name: student.name,
        email: student.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// CURRENT USER
export const getCurrentStudent =
async (req, res) => {

  try {

    const student =
      await prisma.student.findUnique({
        where: {
          id: req.student.id
        },

        select: {
          id: true,
          name: true,
          email: true
        }
      });

    res.status(200).json({
      success: true,
      student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};