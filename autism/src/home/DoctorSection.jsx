import React from "react";
import { FaStethoscope, FaUserFriends, FaStar } from "react-icons/fa";

export default function DoctorSection() {
  return (
    <>
      {/* Doctor Section */}
      <section className="w-full bg-[#f5f6fa] py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGE */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-[320px] md:max-w-[380px] lg:max-w-[420px] rounded-[20px] overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://drankushgarg.com/assets/doctor%202-Dm4JGNzF.webp"
                alt="Dr Ankush Garg"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* RIGHT CONTENT */}
          <div className="md:ml-0 text-center md:text-left">
            <h2 className="text-[28px] sm:text-[30px] md:text-[34px] font-bold text-[#1f2a44]">
              Dr. Ankush Garg
            </h2>
            <p className="text-[#5a78ff] mt-2 font-medium text-[14px] md:text-[15px]">
              Neurodevelopment Specialist | Founder, Manovaidya
            </p>
            <div className="mt-6 space-y-4 text-gray-600 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mx-auto md:mx-0">
              <p>
                With over 10 years of dedicated experience in neurodevelopmental
                care, Dr. Ankush Garg has pioneered the Brain–Gut–
                Neurodevelopment approach that has transformed the lives of over
                5,000 families across India.
              </p>
              <p>
                His integrative methodology combines cutting-edge neuroscience
                research with functional medicine, nutritional psychiatry, and
                evidence-based therapeutic interventions — creating a
                comprehensive system that addresses the root causes of autism,
                ADHD, and neurodevelopmental delays.
              </p>
              <p>
                Dr. Garg’s approach has been recognized for its effectiveness in
                achieving measurable improvements where conventional methods alone
                have plateaued. He regularly conducts workshops, webinars, and
                parent training sessions to empower families with knowledge and
                tools for their child’s development.
              </p>
            </div>

            {/* STATS CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 max-w-md sm:max-w-full mx-auto md:mx-0">
              <div className="bg-[#e9ecf7] rounded-xl p-5 text-center hover:transform hover:-translate-y-1 transition-all duration-200">
                <FaStethoscope className="mx-auto text-[#6c8cff] text-2xl mb-2" />
                <h3 className="font-bold text-[#1f2a44] text-[20px]">10+</h3>
                <p className="text-gray-500 text-[12px] md:text-[13px]">Years Experience</p>
              </div>
              <div className="bg-[#e9ecf7] rounded-xl p-5 text-center hover:transform hover:-translate-y-1 transition-all duration-200">
                <FaUserFriends className="mx-auto text-[#6c8cff] text-2xl mb-2" />
                <h3 className="font-bold text-[#1f2a44] text-[20px]">5000+</h3>
                <p className="text-gray-500 text-[12px] md:text-[13px]">Families Helped</p>
              </div>
              <div className="bg-[#e9ecf7] rounded-xl p-5 text-center hover:transform hover:-translate-y-1 transition-all duration-200">
                <FaStar className="mx-auto text-[#6c8cff] text-2xl mb-2" />
                <h3 className="font-bold text-[#1f2a44] text-[20px]">4.9/5</h3>
                <p className="text-gray-500 text-[12px] md:text-[13px]">Parent Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage Section */}
      <MediaCoverage />
    </>
  );
}

// Helper function to get unique icon for each media outlet
function getMediaIcon(name) {
  const icons = {
    "DailyHunt": "https://play-lh.googleusercontent.com/hob_fdd8pV3AI8K2rv49MumzgdqmBcYW8BfuquYzGtFpsDu-JabZmvZhxm8oNNIX3bg",
    "Republic News India": "https://republicnewsindia.com/wp-content/uploads/2023/07/Republic-News-India-New-Logo-PNG-300x100.png",
    "Flipboard": "https://cdn-icons-png.flaticon.com/512/356/356016.png",
    "The Indian Bulletin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuz3VKDe7AFMIN0cfpYSNELBqav7HuHuhtkQ&s",
    "RD Times": "https://rdtimes.in/wp-content/uploads/2022/02/RD-Times-Logo-PNG-1.png",
    "Abhyuday Times": "https://abhyudaytimes.com/wp-content/uploads/2022/11/Abhyuday-Times-Logo-PNG-300x62.png",
    "Hindustan Saga": "https://i0.wp.com/hindustansaga.com/wp-content/uploads/2022/03/cropped-Hindustan-Saga-Logo-PNG.png?w=397&ssl=1",
    "Let India Shine": "https://letindiashine.com/wp-content/uploads/2021/06/cropped-Let-India-Shine-PNG-300x56.png",
    "Indian Scoops": "https://indianscoops.com/wp-content/uploads/2024/12/Indian-Scoops-01-PNG-1.png",
    "News Outlook": "https://news-outlook.com/wp-content/uploads/2024/03/cropped-News-Outlook-PNG.png",
    "Times Bulletin": "http://times-bulletin.com/wp-content/uploads/2021/08/Times-Bulletin-PNG-300x54.png",
    "Indian Sentinel": "https://indiansentinel.in/wp-content/uploads/2021/04/cropped-Indian-Sentinel-Copy-scaled-1.jpg",
    "National Age": "https://nationalage.com/wp-content/themes/jnews/assets/img/logo@2x.png",
    "India Thrive": "https://thriveindia.org/wp-content/uploads/2025/04/cropped-Thrive-India_Logo_White-background.png",
    "Prevalent India": "https://i0.wp.com/prevalentindia.com/wp-content/uploads/2022/03/cropped-Prevalent-India-PNG.png?w=411&ssl=1",
    "The Fortune India": "https://thefortuneindia.com/wp-content/uploads/2017/11/cropped-The-Fortune-India-PNG-2.png",
    "Pioneer News": "http://pioneernews.co.in/wp-content/uploads/2022/02/Pioneer-News-PNG-1.png",
    "India Influencive": "https://indiainfluencive.com/wp-content/uploads/2022/02/India-Influencive-PNG-3.png",
    "Bharat Herald": "https://bharatherald.com/wp-content/uploads/2021/07/cropped-small-1.png",
    "Youth News Express": "https://youthnewsexpress.com/wp-content/uploads/2021/09/small-1.png",
    "The Telegraph News": "https://thetelegraphnews.com/wp-content/uploads/2021/08/small.png",
    "News Mint 24": "http://newsmint24.com/wp-content/uploads/2021/07/News-Mint24-PNG-1-300x70.png",
    "Press Journal": "https://press-journal.com/wp-content/uploads/2021/08/cropped-Press-Journal-PNG-1.png",
    "News Head": "https://newshead.in/wp-content/uploads/2022/11/News-Head-PNG.png",
    "India News 24": "https://indianews24.co/wp-content/uploads/2021/07/cropped-India-News24-PNG.png",
    "RKD Live": "https://rkdlive.com/wp-content/uploads/2021/06/cropped-small-2.png",
    "The National Reader": "https://thenationalreader.com/wp-content/uploads/2022/11/cropped-The-National-Reader-PNG.png",
    "Scroll News": "http://scrollnews.in/wp-content/uploads/2022/03/Scroll-News-PNG-1.png",
    "Country First": "http://countryfirst.co.in/wp-content/uploads/2022/11/Country-First-PNG.png",
    "News Streamline": "https://newsstreamline.com/wp-content/uploads/2021/06/cropped-cropped-cropped-News-Streamline-PNG-1-2048x352.png",
    "Metro City News": "http://metrocitynews.in/wp-content/uploads/2022/03/Metro-City-News-PNG.png",
    "Gujarat Journal": "http://gujaratjournal.in/wp-content/uploads/2022/03/Gujarat-Journal-png.png",
    "My Maharashtra": "http://mymaharashtra.co.in/wp-content/uploads/2022/08/png.png",
    "Telangana Post": "https://telanganapost.co.in/wp-content/uploads/2017/11/cropped-cropped-png-1.png",
    "Bharat Mirror": "https://telanganapost.co.in/wp-content/uploads/2017/11/cropped-cropped-png-1.png"
  };
  
  return icons[name] || "https://img.icons8.com/color/48/newspaper.png";
}

const mediaLinks = [
  { name: "DailyHunt", url: "http://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/how+dr+ankush+garg+is+redefining+autism+care+in+india+through+ayurveda-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_41ad9760abf811f0bf6f3a0cab15bd8f?sm=Y" },
  { name: "Republic News India", url: "https://republicnewsindia.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Flipboard", url: "https://flipboard.com/@republicnewsind/-how-dr-ankush-garg-is-redefining-autism/a-i80hUB8RRhGSXe5ySX5QOA%3Aa%3A3544623556-0097b8ce16%2Frepublicnewsindia.com" },
  { name: "The Indian Bulletin", url: "https://theindianbulletin.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "RD Times", url: "https://rdtimes.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Abhyuday Times", url: "https://abhyudaytimes.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Hindustan Saga", url: "https://hindustansaga.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Let India Shine", url: "https://letindiashine.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Indian Scoops", url: "https://indianscoops.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Outlook", url: "https://news-outlook.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Times Bulletin", url: "https://times-bulletin.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Indian Sentinel", url: "https://indiansentinel.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "National Age", url: "https://nationalage.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "India Thrive", url: "https://indiathrive.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Prevalent India", url: "https://prevalentindia.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "The Fortune India", url: "https://thefortuneindia.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Pioneer News", url: "https://pioneernews.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "India Influencive", url: "https://indiainfluencive.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Bharat Herald", url: "https://bharatherald.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Youth News Express", url: "https://youthnewsexpress.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "The Telegraph News", url: "https://thetelegraphnews.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Mint 24", url: "https://newsmint24.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Press Journal", url: "https://press-journal.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Head", url: "https://newshead.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "India News 24", url: "https://indianews24.co/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "RKD Live", url: "https://rkdlive.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "The National Reader", url: "https://thenationalreader.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Scroll News", url: "https://scrollnews.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Country First", url: "https://countryfirst.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Streamline", url: "https://newsstreamline.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Metro City News", url: "https://metrocitynews.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Gujarat Journal", url: "https://gujaratjournal.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "My Maharashtra", url: "https://mymaharashtra.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Telangana Post", url: "https://telanganapost.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Bharat Mirror", url: "https://english.bharatmirror.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" }
];

function MediaCoverage() {
  return (
    <section className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-100 py-8 md:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#8b43ba] mb-2">
            Media Coverage
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Featured in leading publications
          </p>
        </div>

        {/* Icons Grid - Fully responsive */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-12 gap-3 justify-items-center items-center">
          {mediaLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
              className="group bg-white rounded-xl w-[75px] h-[75px] sm:w-[80px] sm:h-[80px] 
                         shadow-sm hover:shadow-md transition-all duration-300 
                         border border-purple-100 hover:border-purple-300 
                         flex items-center justify-center overflow-hidden
                         hover:scale-105 transform transition-transform"
            >
              <img
                src={getMediaIcon(item.name)}
                alt={item.name}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain 
                           group-hover:scale-110 transition-transform duration-300"
              />
            </a>
          ))}
        </div>

        {/* Count */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400 font-medium">
            {mediaLinks.length}+ media features
          </p>
        </div>
      </div>
    </section>
  );
}