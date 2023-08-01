'use client'
import { SyntheticEvent, useState } from "react";
import { Contact, ContactStatus, DaemonStatus } from "@prisma/client";
import toast from "react-hot-toast";

export default function ClientSide({ daemons }: { daemons: Contact[] }) {
  const options = [
    { value: ContactStatus.Belum_kontak, bgColorClass: "bg-[#b10202]" },
    { value: ContactStatus.Sudah_kontak, bgColorClass: "bg-[#ffe5a0]" },
    { value: ContactStatus.Sudah_wawan, bgColorClass: "bg-[#d4edbc]" }
  ];

  const daemonstatus = [
    { value: DaemonStatus.Iya, bgColorClass: "bg-[#d4edbc]" },
    { value: DaemonStatus.Bukan, bgColorClass: "bg-[#ffe5a0]" },
  ];

  const [selectedOptions, setselectedOption] = useState(
    daemons.map((daemon: Contact) => ({
      id: daemon.id,
      Contact_Status: daemon.Contact_Status,
    }))
  );

  const [selectedStatus, setselectedStatus] = useState(
    daemons.map((daemon: Contact) => ({
      id: daemon.id,
      Daemon_Status: daemon.Daemon_Status,
    }))
  );

  const handleContactStatusChange = async (index: number, event: SyntheticEvent<HTMLSelectElement>) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index].Contact_Status = event.currentTarget.value as ContactStatus;
    setselectedOption(newSelectedOptions);
    try {
      const response = await fetch("/api/updateContactStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId: selectedOptions[index].id,
          contactStatus: event.currentTarget.value,
        }),
      });

      if (response.ok) {
        // Status updated successfully, you may want to update the UI accordingly
        toast.success("Contact status updated successfully");

      } else {
        // Handle the error case
        toast.error("Failed to update contact status");
      }
    } catch (error) {
      toast.error("Error updating contact status:");
    }
  };

  const handleDaemonChange = async (index: number, event: SyntheticEvent<HTMLSelectElement>) => {
    const newSelectedStatus = [...selectedStatus];
    newSelectedStatus[index].Daemon_Status = event.currentTarget.value as DaemonStatus;
    setselectedStatus(newSelectedStatus);
    try {
      const response = await fetch("/api/updateDaemonStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId: selectedStatus[index].id,
          daemonStatus: event.currentTarget.value,
        }),
      });

      if (response.ok) {
        // Status updated successfully, you may want to update the UI accordingly
        toast.success("Daemon status updated successfully");

      } else {
        // Handle the error case
        toast.error("Failed to update contact status");
      }
    } catch (error) {
      toast.error("Error updating contact status:");
    }
  };


  return (
    <div className="overflow-x-auto">
      <table className='border-2 border-slate-950 mx-auto mt-5 text-xs sm:text-sm md:text-md lg:text-2xl '>
        <thead>
          <tr>
            <th className="border-2 border-slate-950 py-3 px-6 font-black bg-[#fce5cd]">No.</th>
            <th className="border-2 border-slate-950 py-3 px-6 font-black bg-[#fce5cd]">Nama Lengkap</th>
            <th className="border-2 border-slate-950 py-3 px-6 font-black bg-[#fce5cd]">ID LINE</th>
            <th className="border-2 border-slate-950 py-3 px-6 font-black bg-[#fce5cd]">Nomor HP</th>
            <th className="border-2 border-slate-950 py-3 px-6 font-black bg-[#fce5cd]">Status</th>
            <th className="border-2 border-slate-950 py-3 px-6 font-black bg-[#fce5cd]">Apakah Daemon?</th>
          </tr>
        </thead>
        <tbody>
          {daemons.map((daemon: Contact, index: number) => (
            <tr key={daemon.id}>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{index + 1}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.Nama_Lengkap}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.ID_line}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.Nomor_HP}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">
                <select
                  value={selectedOptions[index].Contact_Status}
                  onChange={(event) => handleContactStatusChange(index, event)}
                  className={`p-3 rounded border-2 border-black ${options.find((opt) => opt.value === selectedOptions[index].Contact_Status)?.bgColorClass} ${selectedOptions[index].Contact_Status === ContactStatus.Belum_kontak ? "text-white" : "text-black"} hover:bg-opacity-70 focus:outline-none`}
                >
                  {options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={`p-3 rounded border-2 border-black ${option.bgColorClass} ${option.value === ContactStatus.Belum_kontak ? "text-white" : "text-black"} hover:bg-transparent`}
                    >
                      {option.value.replace(/_/g, " ")} {/* Replacing underscores with spaces */}
                    </option>
                  ))}
                </select>
              </td>

              <td className="border-2 border-slate-950 py-3 px-6 text-center">
                <select
                  value={selectedStatus[index].Daemon_Status}
                  onChange={(event) => handleDaemonChange(index, event)}
                  className={` p-3 rounded border-2 border-black ${daemonstatus.find((opt) => opt.value === selectedStatus[index].Daemon_Status)?.bgColorClass
                    } ${!selectedStatus[index].Daemon_Status ? "text-white" : "text-black"} hover:bg-opacity-70 focus:outline-none text-center`}
                >
                  {daemonstatus.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={` p-3 rounded border-2 border-black ${option.bgColorClass
                        }  hover:bg-transparent`}
                    >
                      {option.value}
                    </option>
                  ))}
                </select>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
