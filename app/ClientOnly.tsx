'use client' 
import { SyntheticEvent, useState } from "react";
import { Contact, ContactStatus, DaemonStatus } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ClientSide({ daemons }: { daemons: Contact[] }) {
  // Get the router object from Next.js to handle navigation
  const router = useRouter();

  // Define an array of options for different contact statuses, along with their corresponding background color classes
  const options = [
    { value: ContactStatus.Belum_kontak, bgColorClass: "bg-[#b10202]" },
    { value: ContactStatus.Sudah_kontak, bgColorClass: "bg-[#ffe5a0]" },
    { value: ContactStatus.Sudah_wawan, bgColorClass: "bg-[#d4edbc]" }
  ];

  // Define an array of options for different daemon statuses, along with their corresponding background color classes
  const daemonstatus = [
    { value: DaemonStatus.Iya, bgColorClass: "bg-[#d4edbc]" },
    { value: DaemonStatus.Bukan, bgColorClass: "bg-[#ffe5a0]" },
  ];

  // Declare state variables selectedContactStatus and selectedDaemonStatus using useState.
  // They will store the selected contact status and daemon status for each contact.
  const [selectedContactStatus, setSelectedContactStatus] = useState(
    daemons.map((daemon: Contact) => ({
      id: daemon.id,
      Contact_Status: daemon.Contact_Status,
    }))
  );

  const [selectedDaemonStatus, setSelectedDaemonStatus] = useState(
    daemons.map((daemon: Contact) => ({
      id: daemon.id,
      Daemon_Status: daemon.Daemon_Status,
    }))
  );

  // Define a function to handle changes in the contact status dropdown
  const handleContactStatusChange = async (index: number, event: SyntheticEvent<HTMLSelectElement>) => {
    try {
      const contactId = selectedContactStatus[index].id;
      const contactStatus = event.currentTarget.value;

      // Send a PUT request to update the contact status via the "/api/updateContactStatus" API endpoint
      const response = await fetch("/api/updateContactStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId,
          contactStatus,
        }),
      });

      // Refresh the page after the update is complete
      router.refresh();

      // If the update is successful, update the state and display a success toast notification
      if (response.ok) {
        const newSelectedContactStatus = [...selectedContactStatus];
        const contact = selectedContactStatus[index];
        newSelectedContactStatus[index] = {
          ...contact,
          Contact_Status: contactStatus as ContactStatus,
        };
        setSelectedContactStatus(newSelectedContactStatus);
        toast.success("Contact status updated successfully");
      } else {
        toast.error(`Failed to update contact status`);
      }
    } catch (error: any) {
      toast.error(`Error updating contact status`);
    }
  };

  // Define a function to handle changes in the daemon status dropdown
  const handleDaemonChange = async (index: number, event: SyntheticEvent<HTMLSelectElement>) => {
    try {
      const contactId = selectedDaemonStatus[index].id;
      const daemonStatus = event.currentTarget.value;

      // Send a PUT request to update the daemon status via the "/api/updateDaemonStatus" API endpoint
      const response = await fetch("/api/updateDaemonStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId,
          daemonStatus,
        }),
      });

      // Refresh the page after the update is complete
      router.refresh();

      // If the update is successful, update the state and display a success toast notification
      if (response.ok) {
        const newSelectedDaemonStatus = [...selectedDaemonStatus];
        const daemon = selectedDaemonStatus[index];
        newSelectedDaemonStatus[index] = {
          ...daemon,
          Daemon_Status: daemonStatus as DaemonStatus,
        };
        setSelectedDaemonStatus(newSelectedDaemonStatus);
        return toast.success("Daemon status updated successfully");
      } else {
        toast.error(`Failed to update daemon status`);
      }
    } catch (error: any) {
      toast.error(`Something went wrong`);
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
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.uuid}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.Nama_Lengkap}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.ID_line}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.Nomor_HP}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">
                <select
                  value={selectedContactStatus[index].Contact_Status}
                  onChange={(event) => handleContactStatusChange(index, event)}
                  className={`p-3 rounded border-2 border-black ${options.find((opt) => opt.value === selectedContactStatus[index].Contact_Status)?.bgColorClass} ${selectedContactStatus[index].Contact_Status === ContactStatus.Belum_kontak ? "text-white" : "text-black"} hover:bg-opacity-70 focus:outline-none`}
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
                  value={selectedDaemonStatus[index].Daemon_Status}
                  onChange={(event) => handleDaemonChange(index, event)}
                  className={` p-3 rounded border-2 border-black ${daemonstatus.find((opt) => opt.value === selectedDaemonStatus[index].Daemon_Status)?.bgColorClass
                    } ${!selectedDaemonStatus[index].Daemon_Status ? "text-white" : "text-black"} hover:bg-opacity-70 focus:outline-none text-center`}
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
