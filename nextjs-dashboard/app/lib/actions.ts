'use server';

export async function createInvoice(formData: FormData) {
  console.log('creating invoices', formData);
  //   creating invoices FormData {
  //     customerId: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
  //     amount: '7',
  //     status: 'paid'
  //   }

  //   ---> Mannual Way
  //   const rawFormData = {
  //     customerId: formData.get('customerId'),
  //     amount: formData.get('amount'),
  //     status: formData.get('status'),
  //   };

  // ---> Using entries to quickly get all entries
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(
    '🪳 ~ file: actions.ts:16 ~ createInvoice ~ rawFormData||',
    rawFormData,
  );
}
