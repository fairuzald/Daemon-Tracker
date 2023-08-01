import ClientSide from './ClientOnly'
import getContacts from './actions/getContacts';
export const dynamic = "force-dynamic";

export default async function Home() {
  const array = await getContacts()
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
      <ClientSide daemons={array} />


    </div>
  )
}
