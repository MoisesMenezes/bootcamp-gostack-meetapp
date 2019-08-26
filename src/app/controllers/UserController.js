import User from '../models/Users';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User Exists' });
    }

    const { id, name, email, speaker } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      speaker,
    });
  }
}

export default new UserController();
