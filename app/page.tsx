import Image from 'next/image'
import ClientSide from './ClientOnly'
export default function Home() {
  const array = [
    {
      id : 1,
      Nama_Lengkap : "Monica Adelia",
      ID_line : "monicadelia88",
      Nomor_HP: "",
      Contact_Status: "Sudah kontak",
      Daemon_Status: "Bukan"
    },
    {
        id : 2,
        Nama_Lengkap : "Monica Adelia",
        ID_line : "monicadelia88",
        Nomor_HP: "",
        Contact_Status: "Belum kontak",
        Daemon_Status: "Iya"
    },

]
  return (
    <div className="
    max-w-[2520px]
    mx-auto
    xl:px-20
    md:px-10
    sm:px-2
    px-4 "
    
    >
    <div className="text-center font-bold text-5xl pt-10 pb-10">FIND THE DAEMONS!</div>
    <ClientSide daemons={array}/>
    
    
   </div>
  )
}
