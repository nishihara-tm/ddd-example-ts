import { RegisterBookApplicationService, RegisterBookCommand } from 'Application/Book/RegisterBookApplicationService/RegisterBookApplicationService';
import express from 'express'
import { PrismaBookRepository } from 'Infrastracture/Prisma/Book/PrismaBookRepository';
import { PrismaClientManager } from 'Infrastracture/Prisma/PrismaClientManager';
import { PrismaTransactionManager } from 'Infrastracture/Prisma/PrismaTransactionManager';
const app = express();
const port = 3333;

app.get('/', (_, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})

app.use(express.json())
app.post('/book', async(req, res) => {
    try {
        const requestBody = req.body as {
            isbn: string;
            title: string;
            priceAmount: number;
        }

        const clientManager = new PrismaClientManager()
        const transactionManager = new PrismaTransactionManager(clientManager)
        const bookRepository = new PrismaBookRepository()
        const registerBookApplicationService = new RegisterBookApplicationService(
           bookRepository,
           transactionManager
        )

        const registerBookcommand: RegisterBookCommand = requestBody
        await registerBookApplicationService.execute(registerBookcommand)

        res.status(200).json({message: 'success'})
    } catch(error) {
        res.status(500).json({message: (error as Error).message })
    }
})