"use client";

import { updatePaymentStatus } from "../actions";

export function PaymentSelect({
  studentId,
  currentStatus,
}: {
  studentId: string;
  currentStatus: string | null;
}) {
  return (
    <form
      action={updatePaymentStatus}
      className="flex items-center gap-2"
      onChange={(e) => {
        (e.currentTarget as HTMLFormElement).requestSubmit();
      }}
    >
      <input type="hidden" name="studentId" value={studentId} />
      <label className="text-xs font-bold text-gray-400 uppercase">
        Payment:
      </label>
      <select
        name="paymentStatus"
        defaultValue={currentStatus ?? "PENDING"}
        className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm font-bold text-navy focus:border-blue focus:outline-none"
      >
        <option value="PENDING">Pending</option>
        <option value="PAID">Paid</option>
        <option value="WAIVED">Waived</option>
      </select>
    </form>
  );
}
