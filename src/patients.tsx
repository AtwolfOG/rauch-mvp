import { cn } from "cn";
import { Plus } from "lucide-react";
import { useState } from "react";
import { HorizontalSeparator } from "./components/seperator";


const queries = [
  {filter: "All", count: 50},
  {filter: "Follow-up", count: 10},
  {filter: "Initial Consult", count: 40},
  {filter: "Lab Review", count: 5},
]

const patients = [
  {name: "Eleanor Vance", age: 30, gender: "Female", status: "Routine", scheduled: "10:00 AM", duration: "15m"},
  {name: "Thomas Ashworth", age: 25, gender: "Male", status: "Follow-Up", scheduled: "12:45 PM", duration: "30m"},
  {name: "Marcus Aurelius", age: 35, gender: "Male", status: "New", scheduled: "2:00 PM", duration: "45m"},
]

export default function Patients() {
  const [currentQuery, setCurrentQuery] = useState(queries[0].filter)
    return (
        <div>
          <header className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>Patients</h1>
              <p>Manage your patient records</p>
            </div>
            <button className='bg-primary hover:bg-primary-hover text-text-inverted rounded px-4 py-2 flex items-center gap-2'>
              <Plus size={20}/> New Patient</button>
          </header>

          <section>
            {/* queries */}
            <div className="flex gap-4 my-6">
              {queries.map(({filter, count}) => (
                <button key={filter} onClick={() => setCurrentQuery(filter)} className={cn("flex items-center gap-2 border border-border rounded-full py-1 px-4", filter === currentQuery ? "bg-primary hover:bg-primary-hover" : "bg-surface/80 hover:bg-surface")}>
                  <p className={cn("text-sm! ", filter === currentQuery ? "text-text-inverted!" : "text-text-muted!")}>{filter}</p>
                  <p className={cn("rounded-full px-3 text-sm! ", filter === currentQuery ? "text-text-inverted! bg-surface-muted/40" : "bg-surface-muted ")}>{count}</p>
                </button>
              ))}
            </div>
            {/* patients table */}
            <div className="flex flex-wrap gap-4">
              {patients.map(({name, status, scheduled, duration}) => (
                <div key={name} className="flex flex-col items-center justify-between bg-surface/50 border border-border rounded-lg px-6 py-6">
                  <div className="flex justify-between gap-6 w-full mb-6">
                    <h4>{name}</h4>
                    <div className="flex flex-col items-end">
                      <p>{scheduled}</p>
                      <p className="flex items-center gap-2 text-sm!">{duration} <div className="bg-bg-muted size-1.5 rounded-full"></div> {status}</p>
                    </div>
                  </div>
                  <HorizontalSeparator/>
                  <div className="flex items-center gap-4 ml-auto">
                    <a href="/patients/consultation"><button className="border border-border px-4 py-2 rounded bg-primary-light hover:bg-primary text-primary hover:text-text-inverted hover:border-primary transition-all duration-300">Start Consultation</button></a>
                    <button className="border border-border px-4 py-2 rounded">View Detatils</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
    )
}