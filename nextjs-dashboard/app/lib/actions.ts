'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), //The amount field is specifically set to coerce (change) from a string to a number while also validating its type.

  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(formData: FormData) {
  //   creating invoices FormData {
  //     customerId: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
  //     amount: '7',
  //     status: 'paid'
  //   }

  //   ---> Manual Way
  //   const rawFormData = {
  //     customerId: formData.get('customerId'),
  //     amount: formData.get('amount'),
  //     status: formData.get('status'),
  //   };

  // ---> Using entries to quickly get all entries
  const rawFormData = CreateInvoice.parse(
    Object.fromEntries(formData.entries()),
  );

  const { customerId, amount, status } = rawFormData;
  const amountInCents = amount * 1000;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // `Redirect` is placed outside of trycatch because redirect works by throwing an error, which would be caught by the catch block.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse(
    Object.fromEntries(formData.entries()),
  );

  const amountInCents = amount * 100;

  try {
    await sql`
     UPDATE invoices
     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
     WHERE id = ${id}
   `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  // Since the action is called directly in the path, `redirect` is not needed
}
