import Total from "../../assets/home-images/total.avif"

export default function OurNumbers() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

      <p className="text-gray-900 text-lg mb-3">Active Users</p>

      <div className="flex items-center gap-1 mb-5">
        <span className="text-[80px] sm:text-[130px] font-extrabold leading-none bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
          28
        </span>
        <img src={Total} alt="Million Graphic" className="w-auto h-[80px] sm:h-[120px] object-cover" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {[
          { label: "Assessments", value: "22.3", suffix: "M+" },
          { label: "Opportunities", value: "140", suffix: "K+" },
          { label: "Organisations", value: "42", suffix: "K+" },
          { label: "Brands trust us", value: "800", suffix: "+" },
          { label: "Countries", value: "78", suffix: "+" },
        ].map((item, i) => (
          <div key={i}>
            <p className="text-gray-900 text-base sm:text-lg mb-2">{item.label}</p>
            <p className="text-2xl sm:text-4xl font-semibold text-gray-900">
              {item.value}<span className="text-blue-600 font-bold">{item.suffix}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}