import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare const globalThis: {
    prisma?: PrismaClient;
};

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient(); // Di production, buat PrismaClient baru
} else {
    if (!globalThis.prisma) {
        globalThis.prisma = new PrismaClient(); // Di development, buat PrismaClient baru hanya jika belum ada
    }
    prisma = globalThis.prisma; // Gunakan prisma dari globalThis
}


export default prisma;
