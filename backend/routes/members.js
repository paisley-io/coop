import express from 'express';
import { members } from '../data.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const member = members.find(m => m.id === req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

router.post('/', (req, res) => {
  const { name, avatar, role, bio, twitter, website } = req.body;
  const id = String(members.length + 1);
  const newMember = { id, name, avatar, role, bio, twitter, website };
  members.push(newMember);
  res.status(201).json(newMember);
});

export default router;
