"use client";

import { Card } from "@/components/ui/card";

interface Associate {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Props {
  associates: Associate[];
}

export default function AssociateTable({
  associates,
}: Props) {
  return (
    <Card className="overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Associate
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Role
            </th>

          </tr>

        </thead>

        <tbody>
           {associates.length === 0 && (
    <tr>
      <td
        colSpan={3}
        className="p-8 text-center text-slate-500"
      >
        No associates found.
      </td>
    </tr>
  )}
          {associates.map((associate) => (
            <tr
              key={associate._id}
              className="border-t"
            >
              <td className="p-4">
                {associate.name}
              </td>

              <td className="p-4">
                {associate.email}
              </td>

              <td className="p-4 capitalize">
                {associate.role.replace(
                  "_",
                  " "
                )}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </Card>
  );
}