import app from './app';
import { cyan } from 'colors';

const port = 5500;

app.listen(port, () => {
    console.log(cyan(`Server is running on port ${port}`));
})