import { Mail, Facebook, Phone, MapPin } from "lucide-react"; // install lucide-react if not yet

const MyContact = () => {
  return (
    <div className="h-screen flex flex-col justify-between text-white">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-start p-4 sm:p-6 flex-grow">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold shimmer-text text-center mb-8 sm:mb-12">
          CONTACT ME
        </h1>

        {/* Two-column layout → stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
          {/* Left box */}
          <div className="border border-white p-4 sm:p-6 rounded-xl space-y-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">Contact Info</h2>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>gerbinguio@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Facebook className="w-5 h-5" />
              <span>facebook.com/gerbinguio.victorino.3</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+639566156741</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>San Pedro City, Laguna, Philippines</span>
            </div>
          </div>

          {/* Right box */}
          <div className="border border-white p-4 sm:p-6 rounded-xl space-y-4">
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              Online Profiles
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="https://www.linkedin.com/in/gerb-victorino-41a183366/"
                className="px-3 py-1 sm:px-4 sm:py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/gerberrs"
                className="px-3 py-1 sm:px-4 sm:py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
              >
                GitHub
              </a>
              <a
                href="https://www.onlinejobs.ph/jobseekers/info/4175877"
                className="px-3 py-1 sm:px-4 sm:py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
              >
                OnlineJobs
              </a>
              <a
                href="https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-homepage"
                className="px-3 py-1 sm:px-4 sm:py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
              >
                Indeed
              </a>
            </div>
            <div className="mt-2">
              <a
                href="/Gerbinguio_Victorino-CV.pdf"
                download
                className="inline-block px-4 sm:px-6 py-1 sm:py-2 border border-white rounded-xl hover:bg-white hover:text-black transition"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 sm:mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Let’s Work Together 🚀
          </h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            I’m open to freelance, collaborations, or full-time opportunities.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=gerbinguio@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-4 sm:px-6 py-1 sm:py-2 border border-white rounded-xl hover:bg-white hover:text-black transition"
          >
            Send me an Email
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-4 text-center text-sm sm:text-base">
        <p>
          © 2025 | Made with{" "}
          <span className="text-white font-semibold">TypeScript</span> &{" "}
          <span className="text-white font-semibold">Tailwind CSS</span>
        </p>
      </footer>
    </div>
  );
};

export default MyContact;
