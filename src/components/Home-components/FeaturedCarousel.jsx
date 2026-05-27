import React, { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

const originalData = [
  {
    title: "H&S Brand Champion Challenge",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/fullbanner/699407471448e_hs-brand-champion-challenge.jpg",
    mode: "Online",
    price: "Free",
  },
  {
    title: "Unstop Weekend Internship",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/fullbanner/69871a1664c48_unstop-weekend-internship.jpg",
    mode: "WFH",
    price: "Free",
  },
  {
    title: "India Innovates 2026",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/fullbanner/6998570fe6905_india_innovates_featured.jpg",
    mode: "Offline",
    price: "Free",
  },
  {
    title: "Virtual Webinar on April 10",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/fullbanner/699970e0d6d80_virtual-webinar-on-april-10.jpg",
    mode: "Online",
    price: "Free",
  },
]

const CARD_WIDTH = 324
const VISIBLE_COUNT = 4
const VIEWPORT_WIDTH = 1290

export default function FeaturedCarousel() {

  const trackRef = useRef(null)

  const data = [
    ...originalData.slice(-VISIBLE_COUNT),
    ...originalData,
    ...originalData.slice(0, VISIBLE_COUNT),
  ]

  const [index, setIndex] = useState(VISIBLE_COUNT)
  const [isHovered, setIsHovered] = useState(false)

  const moveTo = (newIndex) => {
    setIndex(newIndex)
  }

  useEffect(() => {
    const track = trackRef.current
    track.style.transition = "transform 0.8s ease"
    track.style.transform = `translateX(-${index * CARD_WIDTH}px)`

    const handleTransitionEnd = () => {
      if (index >= originalData.length + VISIBLE_COUNT) {
        track.style.transition = "none"
        const newIndex = VISIBLE_COUNT
        track.style.transform = `translateX(-${newIndex * CARD_WIDTH}px)`
        track.offsetHeight
        setIndex(newIndex)
      }
      if (index < VISIBLE_COUNT) {
        track.style.transition = "none"
        const newIndex = originalData.length + VISIBLE_COUNT - 1
        track.style.transform = `translateX(-${newIndex * CARD_WIDTH}px)`
        track.offsetHeight
        setIndex(newIndex)
      }
    }

    track.addEventListener("transitionend", handleTransitionEnd)
    return () => track.removeEventListener("transitionend", handleTransitionEnd)
  }, [index])

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => { moveTo(index + 1) }, 3500)
    return () => clearInterval(interval)
  }, [index, isHovered])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Featured Opportunities</h2>
          <p className="text-sm text-slate-500">Discover trending internships and competitions</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => moveTo(index - 1)}
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Responsive overflow viewport */}
        <div
          className="overflow-hidden w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div ref={trackRef} className="flex gap-6" style={{ transform: `translateX(-${index * CARD_WIDTH}px)` }}>
            {data.map((item, i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[300px] bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-lg transition cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-[200px] sm:h-[300px] object-cover group-hover:scale-105 transition duration-500" />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition">
                    <Heart size={16} />
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 font-medium">{item.mode}</span>
                    <span className="font-medium text-emerald-600">{item.price}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => moveTo(index + 1)}
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}