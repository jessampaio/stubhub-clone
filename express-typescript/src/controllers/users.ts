import database from "../database";
import { type Request, type Response } from "express";
import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import { genHash } from "../utilities/utility";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GETTING ALL THE USERS:

export function getUsers(req: Request, res: Response) {
  const gettingAllUsers = "SELECT * FROM users";

  database.query(gettingAllUsers, (err: Error, data: RowDataPacket) => {
    if (data.length === 0) {
      return res.send("No user has been added.");
    }
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.send(data);
  });
}

// REGISTER USER:

export function registerUser(req: Request, res: Response) {
  const createUserQuery =
    "INSERT INTO users (`first_name`, `last_name`, `email`, `password`) VALUES (?)";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    genHash(req.body.password),
  ];

  database.query(createUserQuery, [values], (err: any, data) => {
    if (err) {
      return res.status(409).json(err);
    }
    if (err) {
      return res.status(500).json(err);
    }
    return res.send("User has been added sucessfully.");
  });

  // return login(req, res)
}

// LOGIN:

export async function login(req: Request, res: Response) {
  const loginQuery = "SELECT * FROM users WHERE email = ?";

  database.query(loginQuery, [req.body.email], (err, data: any) => {
    if (err != null) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found.");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword) return res.status(400).json("Wrong password.");
    console.log("TESTING USER ID BEFORE SIGNING TOKEN:", data[0].user_id);

    const token = jwt.sign(
      { id: data[0].user_id },
      process.env.SECRET_KEY || '',
      { expiresIn: "1d" }
    );
    console.log("token signed:", token);
    return res.cookie('token', token, { sameSite: 'strict', path: '/', maxAge: 604800, httpOnly: true }).json({ token })
  });
}

// UPDATE USER:

export function updateUser(req: Request, res: Response) {
  const token: any = req.token;
  console.log(req.token);
  if (!token) {
    return res.status(400).send("Unauthorized to modify this user.");
  }

  const updatingUserQuery =
    "UPDATE users SET `first_name` = ?, `last_name` = ?, `email` = ?, `password` = ? WHERE user_id = ?";

  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    genHash(req.body.password)
  ];

  database.query(
    updatingUserQuery,
    [...values, token.id],
    (err, data: ResultSetHeader) => {
      if (err != null) {
        return res.json(err);
      }
      if (data.affectedRows === 0) {
        console.log(data);
        return res.status(404).send("This user doesn't exist.");
      }
      return res.send("User has been updated succesfully.");
    }
  );
}

// DELETING USER:

export function deleteUser(req: Request, res: Response) {
  const token: any = req.token;
  if (!token) {
    return res.status(400).send("Unauthorized to delete this user.");
  }

  const deletingUserQuery = "DELETE FROM users WHERE user_id = ?";

  database.query(deletingUserQuery, token.id, (err, data) => {
    if (err != null) {
      console.log(err);
      return res.json(err);
    }
    return res.send("User has been deleted successfully.");
  });
}

// LOGGING OUT:

export function logout(req: Request, res: Response) {
  const token = req.token;

  if (!token) {
    return res.send("No user has been found.");
  }

  req.token = ''
  res.cookie('token', '')
  res.redirect("/");
}
