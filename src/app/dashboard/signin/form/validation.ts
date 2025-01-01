import { z } from "zod";

// Bagian kode utama
export const formSchema = z.object({
    email: z.string({ required_error: 'Email harus diisi' }).email({ message: 'Email tidak valid' }),
    password: z.string({ required_error: 'Password harus diisi' }).min(5, { message: 'Password harus memiliki 5 karakter' }),
});