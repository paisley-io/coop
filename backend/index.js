import express from 'express';
import cors from 'cors';
import membersRoutes from './routes/members.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/members', membersRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
