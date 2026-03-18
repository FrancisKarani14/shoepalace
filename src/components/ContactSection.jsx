import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa'

const details = [
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Nairobi, Kenya — Westlands, Sarit Centre' },
  { icon: FaClock, label: 'Opening Hours', value: 'Mon – Sat: 8:00 AM – 8:00 PM' },
  { icon: FaClock, label: 'Closing Hours', value: 'Sunday: 10:00 AM – 6:00 PM' },
  { icon: FaPhone, label: 'Phone', value: '+254 700 000 000' },
  { icon: FaEnvelope, label: 'Email', value: 'info@shoepalace.co.ke' },
]

export default function ContactSection() {
  return (
    <section className="bg-neutral-950 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-stretch">

        {/* Image */}
        <div className="flex-1 rounded-xl overflow-hidden">
          <img src="/contact.png" alt="Contact" className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <h2 className="text-white text-4xl font-bold tracking-wide">Get In Touch</h2>
          <p className="text-white/50 text-sm">We'd love to hear from you. Visit us, call us, or drop us an email.</p>

          <div className="flex flex-col gap-5 mt-2">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="bg-yellow-400 p-3 rounded-lg flex-shrink-0">
                  <Icon className="text-black text-lg" />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest">{label}</p>
                  <p className="text-white font-medium text-sm mt-1">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
