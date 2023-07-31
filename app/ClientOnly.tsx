'use client'
import { SyntheticEvent, useState } from "react";

export default function ClientSide({ daemons }: { daemons: any[] }) {
  const options = [
    { value: "Belum kontak", bgColorClass: "bg-[#b10202]" },
    { value: "Sudah kontak", bgColorClass: "bg-[#ffe5a0]" },
    { value: "Sudah wawan", bgColorClass: "bg-[#d4edbc]" }
  ];

  const daemonstatus = [
    { value: "Iya", bgColorClass: "bg-[#d4edbc]" },
    { value: "Bukan", bgColorClass: "bg-[#ffe5a0]" },
  ];

  const [selectedOptions, setselectedOption] = useState(
    daemons.map((daemons: any) => daemons.Contact_Status)
  );
  const [selectedStatus, setselectedStatus] = useState(
    daemons.map((daemons: any) => daemons.Daemon_Status)
  );

  const handleStatusChange = (index: number, event: SyntheticEvent<HTMLSelectElement>) => {
    const newSelectedStatus = [...selectedStatus];
    newSelectedStatus[index] = event.currentTarget.value;
    setselectedStatus(newSelectedStatus);
  };

  const handleOptionChange = (index: number, event: SyntheticEvent<HTMLSelectElement>) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.currentTarget.value;
    setselectedOption(newSelectedOptions);
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
          {daemons.map((daemon: any, index: number) => (
            <tr key={daemon.id}>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.id}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.Nama_Lengkap}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.ID_line}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">{daemon.Nomor_HP}</td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">
                <select
                  value={selectedOptions[index]}
        
                  onChange={(event) => handleOptionChange(index, event)}
                  className={` p-3 rounded border-2 border-black ${
                    options.find((opt) => opt.value === selectedOptions[index])?.bgColorClass
                  } ${selectedOptions[index] == "Belum kontak" ? "text-white" : "text-black"} hover:bg-opacity-70 focus:outline-none `}
                >
                  {options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={` p-3 rounded border-2 border-black ${
                        option.bgColorClass
                      } ${
                        option.bgColorClass == "bg-[#b10202]" ? "text-white" : "text-black"
                      } hover:bg-transparent`}
                    >
                      {option.value}
                    </option>
                  ))}
                </select>

              </td>
              <td className="border-2 border-slate-950 py-3 px-6 text-center">
                <select
                  value={selectedStatus[index]}
                  onChange={(event) => handleStatusChange(index, event)}
                  className={` p-3 rounded border-2 border-black ${
                    daemonstatus.find((opt) => opt.value === selectedStatus[index])?.bgColorClass
                  } ${selectedStatus[index] == "Belum kontak" ? "text-white" : "text-black"} hover:bg-opacity-70 focus:outline-none text-center`}
                >
                  {daemonstatus.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className={` p-3 rounded border-2 border-black ${
                        option.bgColorClass
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
