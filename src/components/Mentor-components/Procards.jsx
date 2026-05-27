import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProCards() {
    return (
        <div className="  flex items-center justify-center  py-6 ">
            <div className="max-w-7xl mx-auto w-full px-6">
                <div className="flex flex-wrap gap-2">

                    <Link
                        to="/mentorship"
                        state={{ filter: "Free" }}
                        className="relative flex-1 min-w-[300px] rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer"
                        style={{
                            background:
                                "linear-gradient(135deg, #f8b4c9 0%, #f472b6 60%, #ec4899 100%)",
                            minHeight: 260,
                        }}
                    >
                        <div className="absolute  left-97 -top-10 z-10 w-10 h-14 bg-white rounded-full"></div>

                        <div className="absolute left-2/3 -translate-x-1/2 top-0 bottom-0 flex flex-col items-center justify-center gap-1 w-11">
                            <img src="https://d8it4huxumps7.cloudfront.net/uploads/images/avif/explor-free-strip-card-img.png?d=30x538" className="h-full " alt="" />
                        </div>

                        <div className="relative z-10 p-10">
                            <h2 className="text-4xl font-black text-gray-900 leading-tight">
                                Explore{" "}
                                <span className="text-pink-800">Free</span>
                            </h2>

                            <p className="text-lg text-gray-800 mt-2">
                                Mentorship Sessions
                            </p>
                        </div>

                        <div className="relative z-10 px-10 pb-10">
                            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 text-sm font-semibold text-gray-900 shadow-md group-hover:shadow-xl transition">
                                Explore Free
                                <ArrowRight size={16} />
                            </div>
                        </div>

                        <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
                            <img
                                src="https://d8it4huxumps7.cloudfront.net/uploads/images/avif/explore-free-person-card-img.png"
                                alt="Explore Free"
                                className="object-contain"
                                style={{ maxHeight: 240 }}
                            />
                        </div>

                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition duration-300 pointer-events-none rounded-3xl" />
                        <div className="absolute left-97  z-10 -bottom-10 w-10 h-14 bg-white rounded-full"></div>
                    </Link>

                    <Link
                        to="/mentorship"
                        state={{ filter: "Pro" }}
                        className="relative flex-1 min-w-[300px] rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer"
                        style={{
                            background:
                                "linear-gradient(180deg, #ede9fe 0%, #ddd6fe 40%, #c4b5fd 100%)",
                            minHeight: 260,
                        }}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-purple-300 rounded-t-[100%] opacity-30"></div>

                        <div className="relative z-10 p-10">
                            <h2 className="text-5xl font-black text-gray-900 leading-tight">
                                <span className="text-purple-700">15%</span> OFF
                            </h2>

                            <p className="text-xl text-gray-800 mt-3 leading-snug">
                                On All Mentor Sessions <br />
                                With 👑 Pro
                            </p>
                        </div>

                        <div className="relative z-10 px-10 pb-10">
                            <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 text-base font-semibold text-purple-700 shadow-md group-hover:shadow-xl transition">
                                👑 Explore Pro
                                <ArrowRight size={18} />
                            </div>
                        </div>

                        <div className="absolute bottom-0 right-6 z-10 pointer-events-none">
                            <img
                                src="https://d8it4huxumps7.cloudfront.net/uploads/images/avif/mentor-page-pro-card-image_new.png?d=671x606"
                                alt="Pro Mentor"
                                className="object-contain"
                                style={{ maxHeight: 300 }}
                            />
                        </div>

                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition duration-300 pointer-events-none rounded-3xl" />
                    </Link>
                </div>
            </div>
        </div>
    );
}