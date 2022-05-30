import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { mailgun ,isAuth, isAdmin, generateToken, sendEmail, emailTemplate } from '../utils.js';
import crypto from 'crypto';


const userRouter = express.Router();

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      await user.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Email ou mot de passe invalide' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.post(
  '/mailclient',
  expressAsyncHandler(async (req, res) => { 
    const  {email2}  = req.body.email2

    const user = await User.findOne({ email2 })
  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }
  await user.save()

    try {
       await sendEmail({
        email: req.body.email2,
        subject: 'JayShop nouveauté catalogue été 2022',
        text : 'hi',
        html : emailTemplate(),
      })
      
      res.status(200).json({
        status: 'success',
        message: 'Email envoyé !',
      })
    } catch (error) {
      await user.save()
      res.status(500)
      throw new Error('Error')
    }
  })
);

userRouter.post(
  '/forgotpassword',
  expressAsyncHandler(async (req, res) => { 
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401)
      throw new Error('User not found!')
    }
  
    const resetToken = user.createPasswordResetToken()
    await user.save()
  
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/resetpassword/${resetToken}`
  
    const message = `Mot de passe oublié? Créez un nouveau mot de passe pour votre compte en visitant ce URL: ${resetURL} \nSi vous n'avez pas oublié votre mot de passe, veuillez ignorer cet e-mail !`
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Votre jeton de réinitialisation de mot de passe (valable pour 10 minutes)',
        message,
      })
      
      res.status(200).json({
        status: 'success',
        message: 'Lien envoyé avec succès',
      })
    } catch (error) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()
      res.status(500)
      throw new Error('Error sending email!')
    }
  })
);


userRouter.patch(
  '/resetpassword/:token',
  expressAsyncHandler(async (req, res) => {
    
  // decrypt token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (user) {
    console.log("user with reset pass token found ");
    user.password = bcrypt.hashSync(req.body.password)
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.status(200).json({
      status: 'success',
      message: 'Mot de passe envoyé avec succès',
    })
  } else {
    res.status(400)
    throw new Error('Lien invalide ou expiré')
  }
}));

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
  })
);

export default userRouter;
