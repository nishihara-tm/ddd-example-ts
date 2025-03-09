import { Prisma, PrismaClient } from '@prisma/client';
import prisma from './prismaClient';

type Client = PrismaClient | Prisma.TransactionClient;
export class PrismaClientManager  {
  private client: Client = prisma;

  setClient(client: Client): void {
    this.client = client;
  }

  getClient() {
    return this.client;
  }
}