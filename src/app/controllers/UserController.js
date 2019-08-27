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

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, speaker } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      speaker,
    });
  }
}

export default new UserController();
