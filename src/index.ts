import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Validator } from './validator/validator';

const app = express();

interface Test {
  a: number;
  b: string;
}

app.use(
  bodyParser.json({
    limit: '10mb',
  }),
);

app.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    const { a, b } = Validator<Test>(req.body).isNumber('a').isString('b');

    console.log(a, b);

    res.sendStatus(200);
  } catch (err: any) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.info(`Server running on 3000 port`);
});
