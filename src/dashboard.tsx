import {  AudioLines, Calendar, ChevronRight, NotebookPen } from 'lucide-react'


const schedules = [
    {
        time: "08:30 AM",
        name: "Sarah Johnson",
        event: 'FOLLOW-UP',
        duration: "30m",
    },
    {
        time: "09:30 AM",
        name: "Michael Chen",
        event: 'INITIAL CONSULTATION',
        duration: "1h",
    },
    {
        time: "10:30 AM",
        name: "Emma Brown",
        event: 'LAB REVIEW',
        duration: "45m",
    },
    {
        time: "11:30 AM",
        name: "Robert Green",
        event: 'ROUTINE CHECKUP',
        duration: "30m",
    }
]

const reviews = [
  {name: 'Robert Silvers', time: "5m ago"},
  {name: 'Emma Watson', time: '1h ago'},
  {name: 'Michael Brown', time: '2h ago'},
]

function Dashboard() {
  return (
    <div className="">
        <header className="pt-6">
          <h1 className="text-2xl font-bold">Good Morning, Dr. Julian Vance</h1> 
          <p>You have 4 appointments and 3 drafts awaiting your attention.</p>
        </header>

        <section className='my-12'>
          <div className="grid grid-cols-[40%_60%] max-lg:grid-cols-1 gap-4">
            {/* schedules preview */}
            <div className='bg-surface/80 rounded-lg p-4 border border-border h-max'>
              <div className="flex items-center justify-between">
                <h2 className='flex items-center gap-2 text-lg font-medium'> <Calendar/> Today's Schedule</h2>
                <a className='link-hover'>View All</a>
              </div>
              <div className="flex flex-col gap-6 mt-6 max-w-80">
                {schedules.map(({time, name, duration, event}) => (
                  <div className='flex items-center justify-between max-w-70'>
                    <div>
                      <h5>{name}</h5>
                      <p className='text-sm text-text-muted!'>{event} - {duration}</p>
                    </div>
                    <p className='text-text-muted! text-sm!'>{time}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* draft and insights preview */}
            <div className="bg-surface/80 rounded-lg p-4 border border-border">
              <div className='flex items-center justify-between'>
                <h2 className='flex items-center gap-2 text-lg font-medium'><NotebookPen/> Pending Review</h2>
                <a className='link-hover'>View All</a>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                {reviews.map(({name, time}) => (
                  <div className="bg-surface min-w-[250px] flex-1 flex flex-col justify-between px-2 py-4 rounded shadow-lg">
                    <div className='flex items-center justify-between'>
                      <p className='flex items-center gap-2 text-sm! border-dashed border p-1 rounded'> <AudioLines size={18}/> Ruach Scribe Synthesis</p>
                      <p className='text-xs! text-text-muted!'>{time}</p>
                    </div>

                    <div className='mt-2'>
                      <h4>{name}</h4>
                      <p className='text-sm! text-text-muted!'>Clinical Note</p>
                    </div>

                    <div className='mt-4'>
                      <a href="" className="link-hover flex items-center justify-end justify-self-end w-min">Review<ChevronRight size={24}/></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Dashboard
