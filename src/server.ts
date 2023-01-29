import { app } from './app';
import { config } from 'dotenv';
import { AppDataSource } from './database/data-source';

config();
const port = process.env.PORT || 3333;


AppDataSource.initialize();
app.listen(port, () => console.log(`Server rodando na porta: ${port}`));
