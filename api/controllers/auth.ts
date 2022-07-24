import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get, post } from '../../services/api-call';
import { createSuccess, createFailure } from '../../utils/api-response';
import config from '../../config';

const getUserById = async (id: string) => {
  const url = `${config.team.host}${config.team.getMember}${id}`;
  const user = await get({
    url,
  });

  return user;
};

const getUserByEmail = async (email: string) => {
  const url = `${config.team.host}${config.team.getMemberByEmail}${email}`;
  const oldUser = await get({
    url,
  });

  return oldUser;
};

const createUser = async (user: any) => {
  const url = `${config.team.host}${config.team.new}`;

  const newUser = await post({
    url,
    data: user,
  });

  return newUser;
};

const register = async (req: Request, res: Response, next: any) => {
  try {
    const { name, email, pw } = req.body;

    if (!(name && email && pw)) {
      const errRequired = createFailure(400, 'All inputs are required!');
      res.status(400).send(errRequired);
    }

    const oldUser = await getUserByEmail(email);

    if (oldUser?.data.length) {
      const errOldUser = createFailure(
        409,
        'User Already Exists. Please Login!'
      );
      return res.status(409).send(errOldUser);
    }

    const salt = await bcrypt.genSalt();
    const encPw = await bcrypt.hash(pw, salt);

    const user = await createUser({
      name,
      email,
      pw: encPw,
    });
    res.send(user);
  } catch (error) {
    const resPayload = createFailure(undefined, error);
    res.status(500).send(resPayload);
  }
};

const login = async (req: Request, res: Response, next: any) => {
  try {
    const { email, pw } = req.body;

    if (!(email && pw)) {
      const errRequired = createFailure(400, 'All inputs are required!');
      res.status(400).send(errRequired);
    }

    const user = await getUserByEmail(email);

    if (!user?.data.length) {
      const errNoUser = createFailure(400, 'User not found. Please register!');
      return res.status(400).send(errNoUser);
    }

    const userData = user.data[0];
    const pwMatch = await bcrypt.compare(pw, userData.password);

    if (pwMatch) {
      const token = jwt.sign({ id: userData.userid }, config.jwt.tokenKey, {
        expiresIn: '1h',
      });

      const authResponse = createSuccess({
        loggedIn: true,
        token,
      });

      res.send(authResponse);
    }

    const errInvalid = createFailure(400, 'Invalid credentials!');
    res.status(400).send(errInvalid);
  } catch (error) {
    const resPayload = createFailure(undefined, error);
    res.status(500).send(resPayload);
  }
};

const logout = async (req: Request, res: Response, next: any) => {
  // try {
  //   const { userid } = req.params;
  //   const url = `${config.io.host}${config.io.team.getMember}${userid}`;
  //   const resPayload = await get({
  //     url,
  //   });
  //   res.send(resPayload);
  // } catch (error) {
  //   const resPayload = createFailure(error);
  //   res.status(500).send(resPayload);
  // }
};

const getUser = async (req: Request, res: Response, next: any) => {
  try {
    // const { userId } = req.params;
    const { id } = req.user;

    const user = await getUserById(id);
    const userData = user.data[0];
    const userResponse = createSuccess({
      id: userData.userid,
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
    });
    res.send(userResponse);
  } catch (error) {
    const resPayload = createFailure(undefined, error);
    res.status(500).send(resPayload);
  }
};

export { register, login, logout, getUser };
